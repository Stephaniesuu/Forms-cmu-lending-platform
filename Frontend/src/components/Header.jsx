import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
    return (
        <header className="flex justify-between sticky top-0 w-full bg-white shadow-md p-4">
            <h1 className="text-xl font-bold">My Sticky Header</h1>
            <ConnectButton />
        </header>
    );
};

export default Header;
