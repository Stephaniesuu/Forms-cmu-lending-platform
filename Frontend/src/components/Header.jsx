import { ConnectButton } from "@rainbow-me/rainbowkit";
import Firework from "./fireworks/Firework";

const Header = () => {
    return (
        <header className="relative flex justify-between items-center sticky top-0 w-full bg-white shadow-md p-4 overflow-hidden">
            <Firework />
            <h1 className="text-xl font-bold z-10 text-white">CMU</h1>
            <ConnectButton className="z-10" />
        </header>
    );
};

export default Header;
