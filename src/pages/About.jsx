import React from 'react'

export default class LogIn extends React.Component {
    render () {
        return(
            <div className="container">
                 <div className='d-flex flex-column align-items-center w-100 size'>
                     <br/>
                     <br/>
                     <h1 className='font-weight-bold text-uppercase'>
                        Welcome to SmartCents
                     </h1>
                     <br/>
                     <br/>
                     <p className='text-justify about'>
                            We know you're busy with life and the last thing you want to do is sit down and try and sort out your finances at the end of a long day. Smartcents, 
                            is an innovative web app to help you keep track of your budget and expenses at home and on the go. 
                            Simply create a budget, enter expenses as they happen and get on the road to saving for that Lambo you've always dreamed of!
                     </p>

                     <p className='text-justify about'>
                         Hope you Love this app.
                     </p>

                 </div>
            </div>
        )
    }
}