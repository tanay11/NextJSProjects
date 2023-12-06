import React from 'react'

type ProfileProps = {
    params:{
        id:string
    }
}

const UserProfile = (context:ProfileProps) => {
    const {params} = context
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile page {params.id}</p>
    </div>
  )
}

export default UserProfile
