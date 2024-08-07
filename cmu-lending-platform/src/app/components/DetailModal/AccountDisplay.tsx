import { Address, useAccount } from "@ant-design/web3";
import styled from "@emotion/styled";
import { Alert, Badge } from "antd";
import { useEffect, useRef, useState } from "react";
import createWeb3Avatar from 'web3-avatar';


const containerStyle = {
    display: 'flex',
    width: '513px',
    height: '82px',
    padding: '20px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '80px',
    flexShrink: 0,
    marginBottom: '25px',
}

const rowgapStyle: React.CSSProperties = {
    display: 'flex',
    width: '180px',
    height: '80px',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
}

const headingStyle = {
    color: 'var(--text-theme_light-high_em, #110C22)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px', // 171.429%
};


const StyledAddress = styled(Address)`
  .ant-typography css-dev-only-do-not-override-sdmdlq {
    color: var(--text-theme_light-low_em, #8D8A95);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const CustomAvatar = ({ Address }: { Address: string }) => {
    const avatarRef = useRef(null);

    useEffect(() => {
        if (avatarRef.current) {
            createWeb3Avatar(avatarRef.current, Address);
        }
    }, [Address]);
    return <div ref={avatarRef} style={{ width: '40px', height: '40px' }}></div>;
};

export default function AccountDisplay({ IsBorrow, counterpartyAddress = '0xBc0aD2D4F8A177d1A9854Fb40B7F159B2DC32232' }: { IsBorrow: boolean; counterpartyAddress: string }) {
    const { account } = useAccount();
    const [error, setError] = useState<string | null>(null);
    try {
        if (account.address === ''){
            throw new Error('Account not found');
        }
    }
     catch (error:any) {
        setError(error.message);
    }
    return (
        <div style={containerStyle}>
            {error ? (
                <Alert message="Error" description={error} type="error" showIcon />
            ) : (
                <>
                    <div style={rowgapStyle}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}>
                            {IsBorrow ? (
                                <CustomAvatar Address={counterpartyAddress} />
                            ) : (
                                <Badge count={'you'}>
                                    <CustomAvatar Address={account.address} />
                                </Badge>
                            )}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: '2px',
                            }}>

                                <p style={headingStyle}>Buyer</p>
                                <StyledAddress ellipsis address={IsBorrow ? counterpartyAddress : account.address} tooltip />
                            </div>
                        </div>
                    </div>
                    <div style={rowgapStyle}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}>
                            {IsBorrow ? (
                                <Badge count={'you'}>
                                    <CustomAvatar Address={account.address} />
                                </Badge>
                            ) : (
                                <CustomAvatar Address={counterpartyAddress} />
                            )}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: '2px',
                            }}>
                                <p style={headingStyle}>Seller</p>
                                <StyledAddress ellipsis address={IsBorrow ? account.address : counterpartyAddress} tooltip />
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>)

}