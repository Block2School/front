import Link from 'next/link'


export default function Sidebar() {

  return (
    <div className="sidebar-component">
        <div className='sidebar-item'>
          <Link href={'/back-office'} passHref>
                  <span className="sidebar-item-title">Admin</span>
          </Link>
        </div>
        <div>
          <Link href={'/back-office/users'} passHref>
                  <span className="sidebar-item-title">Users</span>
          </Link>
        </div>
        <div>
          <Link href={'/back-office/tutorials'} passHref>
                  <span className="sidebar-item-title">Tutorials</span>
          </Link>
        </div>
        <div>
          <Link href={'/back-office/admin-users'} passHref>
                  <span className="sidebar-item-title">Admin Users</span>
          </Link>
        </div>
        <div>
          <Link href={'/back-office/blog'} passHref>
                  <span className="sidebar-item-title">Blog</span>
          </Link>
        </div>
    </div>
  )
}