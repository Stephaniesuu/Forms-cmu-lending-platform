import { Address } from "@ant-design/web3";
import styled from "@emotion/styled";
import { Badge } from "antd";
import { useEffect, useRef } from "react";
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

const rowgapStyle = {
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

// const addressStyle = {
//     color: 'var(--text-theme_light-low_em, #8D8A95)',
//     fontFamily: 'Poppins',
//     fontSize: '16px',
//     fontStyle: 'normal',
//     fontWeight: 700,
//     lineHeight: 'normal',
// };


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

export default function AccountDisplay() {
    return (
        <div style={containerStyle}>
            <div style={rowgapStyle}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                    <CustomAvatar Address={'0xBc0aD2D4F8A177d1A9854Fb40B7F159B2DC32232'} />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: '2px',
                    }}>
                        <p style={headingStyle}>Buyer</p>
                        <StyledAddress ellipsis address={'0xBc0aD2D4F8A177d1A9854Fb40B7F159B2DC32232'} tooltip />
                    </div>
                </div>
            </div>
            <div style={rowgapStyle}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                    <Badge count={'you'}>
                        <CustomAvatar Address={'0xcAF37ebf324306731311F92b63E90D97d541569e'} />
                    </Badge>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: '2px',
                    }}>
                        <p style={headingStyle}>Seller</p>
                        <StyledAddress ellipsis address={'0xcAF37ebf324306731311F92b63E90D97d541569e'} tooltip />
                    </div>
                </div>
            </div>
        </div>)

}