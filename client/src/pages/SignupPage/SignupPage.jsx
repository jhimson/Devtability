import React from 'react'

const SignupPage = () => {

  return (
    <div>
        <form>
            <div>
                <label htmlFor="Name">Name</label>
                <input type="text" placeholder='Name'/>
            </div>
            <div>
                <label htmlFor="Email">Email</label>
                <input type="email" placeholder='Email'/>
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <input type="password" placeholder='Password'/>
            </div>
            <input type="submit" value={`Submit`}/>
        </form>
    </div>
  )
}

export default SignupPage