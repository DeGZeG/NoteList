import React from 'react';
import {connect} from 'react-redux'
import Menu from "./components/Menu";
import Main from "./components/Main";
import Alert from "./components/Alert";

function App({alertShow}) {
    return (
        <>
            <div className='container'>
                <Menu />
                <Main />
            </div>
            {alertShow && <Alert />}
        </>
    );
}

const mapStateToProps = state => ({
    alertShow: state.app.alertShow
});

export default connect(mapStateToProps, null)(App);
