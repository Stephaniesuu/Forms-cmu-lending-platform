import { Tooltip } from "antd";
import { h1Style, h3Style, IcontextStyle } from "../SupplyDetailModal";
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { RecordDataType } from "../../../data/metadata_interface";

import { getSymbolByAddress, renderCoinValue} from '../../../data/coinsPrice';
import { renderCoin, renderCoinLarge, renderAmount, getCoinValue, renderDate } from "../../Table/functions";

export default function SupplyStatus({ contract }: { contract: RecordDataType }) {
    const text = <p>Liquidation will performed automatically once the value decrease exceeds the margin.</p>;


    return (
        <div style={{ width: "100%" }}>
            <header >
                <div style={{
                    display: 'flex',
                    marginLeft: '63px',
                    marginTop: '37px',

                }}>
                    <FileSearchOutlined style={{
                        width: '30px',
                        height: '30px',
                        marginTop: '10px',
                        marginBottom: '20px',
                        fontSize: 30,
                        color: '#8247E5',
                    }} />
                    <h1 style={IcontextStyle}>Status</h1>
                </div>
                {/* <h2 style={h2Style} >repay your borrowed coins and get collateral back</h2> */}
            </header>
            <div style={{ display: 'flex', marginBottom: '20px', }}>
                <div style={{ display: 'flex', }}>
                    <div>
                        <p style={h1Style}>Supply</p>
                        {renderCoinLarge(getSymbolByAddress(contract.asset))}
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <p style={h1Style}>Repayment</p>
                        {renderCoinLarge(getSymbolByAddress(contract.asset))}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", marginBottom: '20px' }}>
                <div>
                    <h1 style={h1Style}>
                        Amount
                    </h1>
                    <h2 style={{
                        fontSize: '20px',
                        color: '#0F1D40',
                        marginLeft: '63px',
                    }}>{renderAmount(contract.assetAmount)}</h2>
                </div>
                <div style={{ marginLeft: '63px' }}>
                    <h1 style={h1Style}>
                        Amount
                    </h1>
                    <h2 style={{
                        fontSize: '20px',
                        color: '#0F1D40',
                        marginLeft: '63px',
                    }}>{renderAmount(contract.repaymentAmount)}</h2>
                </div>
            </div>
            <div style={{ marginTop: '5px', marginBottom: '20px' }}>
                <div style={{ display: 'flex' }}>
                    <h1 style={h1Style}>Current Value </h1>
                    <div>
                        <Tooltip placement="rightTop" title={text} arrow={false}>
                            <QuestionCircleOutlined style={{ fontSize: 15, color: '#8247E5', marginLeft: '10px' }} />
                        </Tooltip>
                    </div>
                    
                </div>
                <div style={{marginBottom:'20px'}}>
                <p style={h3Style}>{renderCoinValue(contract.repayment, contract.repaymentAmount)}</p>
                </div>
                <p style={h1Style}>Create Date</p>
                <p style={h3Style}>{renderDate(contract.createDate)}</p>
            </div>

        </div>
    );
}