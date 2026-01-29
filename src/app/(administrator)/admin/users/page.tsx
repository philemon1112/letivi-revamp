import UserListTable from '@/components/molecules/Admin/UserListTable'
import React from 'react'

function UsersList() {
    return (
        <div className="">
            <section className="bg-white sm:rounded-lg">
                <UserListTable />
            </section>
        </div>
    )
}

export default UsersList