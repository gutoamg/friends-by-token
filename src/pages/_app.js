import { useContext, useRef } from 'react';
import '../../styles/globals.css'
import { MouseProvider } from '../contexts/MouseMoveContext'
import { ScrollProvider } from '../contexts/ScrollContext'
import { UserProvider } from '../contexts/UserContext'


function MyApp({ Component, pageProps }) {

	return (
		<MouseProvider>
			<ScrollProvider>
				<UserProvider>
					<Component {...pageProps} />
				</UserProvider>
			</ScrollProvider>
		</MouseProvider>
	)
}

export default MyApp
