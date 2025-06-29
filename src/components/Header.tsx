import AvatarSelector from './AvatarSelector'
import LanguageSelector from './LanguageSelector'
import NotificationPanel from './Notifycation'
import Settings from './Settings'
import ThemeSelector from './ThemesSelector'

const Header = () => {
  return (
    <div className='w-full flex justify-end items-center gap-4 py-4 shadow-sm px-8'>
        <LanguageSelector/>
        <ThemeSelector/>
        <NotificationPanel/>
        <AvatarSelector/>
        <Settings/>
    </div>
  )
}

export default Header