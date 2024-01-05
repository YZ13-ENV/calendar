import { config } from "@/app.config"
import RemoteServerLogo from "../shared/remote/remote-logo-server"
import UserCircle from "../shared/user-circle"

const Header = () => {
    return (
        <header className="w-full h-16 shrink-0 border-b px-6 flex items-center justify-between">
            <RemoteServerLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={36} />
            <UserCircle />
        </header>
    )
}

export default Header