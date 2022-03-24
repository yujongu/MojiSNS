import React from 'react'
import "./AccountSetting.css";


const AccountSetting = () => {
    const currUser = JSON.parse(localStorage.getItem("currentUser"));

    return (
        <main className="accMain">
            <div className="center1">
                <div className="header">
                    <div className="headerApp">
                        <h2 className="titleWeb">Account Setting</h2>
                    </div>
                </div>
                <div className='settingCard'>
                    <div className='settingContainer'>
                        <h3 className='accSett'>
                            Account Setting
                        </h3>
                        <h4 className='header4set'>
                            Account Preference
                        </h4>
                        <hr class="solid" />
                        <h4 className='header4set'>
                            Email Address
                        </h4>
                        <div className='emailSet'>
                            <p id="userEmail">{currUser.USER_EMAIL}</p>
                            <a href="?#divTwo" id="button" class="emailEdit">Edit Email</a>
                        </div>
                        <hr class="solid" />
                        <div className='accountDelete'>
                            <h4 className='header4set'>
                                Account Deletion
                            </h4>
                            <a href="?#divThree" id="button" class="deleteBtn">Delete</a>
                        </div>
                        <div class="overlay" id="divTwo">
                            <div class="wrapperEmail">
                                <div class="forgetHeader">
                                    <h2>Update Email Address</h2>
                                    <a href="#" class="close">&times;</a>
                                </div>
                                <div class="content">
                                    <div class="contentInside">
                                        <form>
                                            <label>
                                                User Email
                                            </label>
                                            <input type="textE" placeholder={currUser.USER_EMAIL}>
                                            </input>
                                            <button type="submitE">Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="overlay" id="divThree">
                            <div class="wrapperEmail">
                                <div class="forgetHeader">
                                    <h2>Account Delete</h2>
                                    <a href="#" class="close">&times;</a>
                                </div>
                                <h3>Please Type in "Delete My Account" to delete</h3>

                                <div class="content">
                                    <div class="contentInside">
                                        <form>
                                            <label>
                                                Confirmation
                                            </label>
                                            <input type="textD" placeholder="Delete My Account">
                                            </input>
                                            <button type="submitD">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AccountSetting