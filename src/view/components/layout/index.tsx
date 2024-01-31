import { Outlet } from "react-router-dom"

const Layout:React.FC = () => {
    return (
        <main id="app">
            <Outlet />
       </main>
    )
}

export default Layout
