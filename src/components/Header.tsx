import AvatarSelector from './AvatarSelector'
import LanguageSelector from './LanguageSelector'
import NotificationPanel from './Notifycation'
import Settings from './Settings'
import ThemeSelector from './ThemesSelector'

const Header = () => {
  return (
     <div className="w-full flex justify-end items-center gap-4 py-4 px-8 sticky top-0 z-40 bg-white shadow">
        <LanguageSelector/>
        <ThemeSelector/>
        <NotificationPanel/>
        <AvatarSelector/>
        <Settings/>
    </div>
  )
}

export default Header