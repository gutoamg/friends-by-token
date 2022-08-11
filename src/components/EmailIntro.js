import React, { useContext, useEffect, useState } from 'react'
import classNames from '../../styles/EmailIntro.module.scss'
import SearchBar from './SearchBar'
import { UserContext } from '../contexts/UserContext';

const EmailIntro = () => {
	let { userInfo, setUserInfo } = useContext(UserContext);
	const [display, setDisplay] = useState('block');

	useEffect(() => {
		if (userInfo.emailSubmitted === 'true') {
			setTimeout(() => {
				setDisplay('none');
			}, 500);
		}
	}, [userInfo])


	return (
		<div className={classNames.introContainer} style={{"display": display}}>
			<SearchBar />
		</div>
	)
}

export default EmailIntro