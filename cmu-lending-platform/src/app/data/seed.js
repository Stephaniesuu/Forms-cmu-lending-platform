//only for seed.js

// {
//   "presets": ["@babel/preset-env", "@babel/preset-typescript","next/babel"]
// }


require('dotenv').config();
require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx']
});

const { db } = require('@vercel/postgres');
const { contracts } = require('./contractData.tsx'); // 直接导入 TypeScript 文件

async function createTableAndInsertContracts() {
  const client = await db.connect();

  try {
    // 创建表的 SQL 语句
    await client.query(`
      CREATE TABLE IF NOT EXISTS contracts (
        address TEXT PRIMARY KEY,
        buyer TEXT,
        seller TEXT,
        asset TEXT,
        assetAmount NUMERIC,
        assetValue NUMERIC,
        repayment TEXT,
        repaymentAmount NUMERIC,
        repayValue NUMERIC,
        collateral TEXT,
        collateralAmount NUMERIC,
        originalCollateralValue NUMERIC,
        margin NUMERIC,
        interest NUMERIC,
        loanDuration INTEGER,
        status TEXT,
        createDate DATE,
        deadline DATE
      )
    `);

    // 插入数据
    for (const contract of contracts) {
      const createDate = contract.createDate ? new Date(contract.createDate) : null;
      const deadline = contract.deadline ? new Date(contract.deadline) : null;

      // 检查日期是否有效
      const isValidDate = (date) => date instanceof Date && !isNaN(date);

      await client.query(`
        INSERT INTO contracts (address, buyer, seller, asset, assetAmount, assetValue, repayment, repaymentAmount, repayValue, collateral, collateralAmount, originalCollateralValue, margin, interest, loanDuration, status, createDate, deadline)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        ON CONFLICT (address) DO NOTHING
      `, [
        contract.address || null, 
        contract.buyer, 
        contract.seller, 
        contract.asset, 
        contract.assetAmount, 
        contract.assetValue, 
        contract.repayment, 
        contract.repaymentAmount, 
        contract.repayValue, 
        contract.collateral || null,
        contract.collateralAmount, 
        contract.originalCollateralValue,
        contract.margin,
        contract.interest,
        contract.loanDuration,
        contract.status, 
        isValidDate(createDate) ? createDate : null,
        isValidDate(deadline) ? deadline : null 
      ]);
    }
    console.log('Table created and contracts inserted successfully');
  } catch (error) {
    console.error('Error creating table or inserting contracts:', error);
  } finally {
    await client.end();
  }
}

createTableAndInsertContracts();


