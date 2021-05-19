import { signIn, signOut, useSession } from 'next-auth/client'
import React from 'react'

const IndexPage: React.FC = () => {
  const [session] = useSession()

  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
  </>
}

export default IndexPage
