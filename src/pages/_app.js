import '../../styles/globals.css'
import { MouseProvider } from '../contexts/MouseMoveContext'
import { ScrollProvider } from '../contexts/ScrollContext'


function MyApp({ Component, pageProps }) {
	return (
		<MouseProvider>
			<ScrollProvider>
				<Component {...pageProps} />
			</ScrollProvider>
		</MouseProvider>
	)
}

export default MyApp
