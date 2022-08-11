import Head from 'next/head'
import { useContext, useEffect, useRef } from 'react'
import styles from '../../styles/Home.module.scss'
import Background from '../components/Background.'
import EmailIntro from '../components/EmailIntro'
import FirstPage from '../components/FirstPage'
import NFTDisplay from '../components/NFTDisplay'
import { ScrollContext } from '../contexts/ScrollContext';

export default function Home() {
	let { setPageHeight, setPageWidth } = useContext(ScrollContext);
	const pageRef = useRef(0);

	useEffect(() => {
		setPageHeight(pageRef.current.offsetHeight);
		setPageWidth(pageRef.current.offsetWidth);
	}, []);

	useEffect(() => {
		const resizeMethod = () => {
			setPageHeight(pageRef.current.offsetHeight);
			setPageWidth(pageRef.current.offsetWidth);
		}
		window.addEventListener('resize', resizeMethod);
		return () => window.removeEventListener('resize', resizeMethod);
	}, []);


	return (
		<div className={styles.container}>
			<Head>
				<title>Friends-by-T0ken</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content={'A new way of making friends, through NFTs. Our culture is changing and so the ways we make create connections'}
				/>

            // Twitter
				<meta name="twitter:card" content='A new way of making friends, through NFTs. Our culture is changing and so the ways we make create connections' key="twcard" />
				<meta name="twitter:creator" content={'Augusto M. Gouveia'} key="twhandle" />

            //Open Graph
				<meta property="og:url" content={'https://friends-by-token-bxjg5046r-gutoamg.vercel.app/'} key="ogurl" />
				<meta property="og:image" content='https://friends-by-token-bxjg5046r-gutoamg.vercel.app/intro-screenshot.png' key="ogimage" />
				<meta property="og:site_name" content={'Friends-by-T0ken'} key="ogsitename" />
				<meta property="og:title" content={"Friends-by-T0ken"} key="ogtitle" />
				<meta property="og:description" content={'A new way of making friends, through NFTs. Our culture is changing and so the ways we make create connections'} key="ogdesc" />


            // Favicons
				<link rel="icon" type="image/png" href="/friends-by-token-icon.png" />
				<meta name="theme-color" content="rgb(0,0,0)" />
			</Head>

			<main className={styles.main} ref={pageRef}>
				<Background />
				<FirstPage />
				<EmailIntro />
				{/* <NFTDisplay /> */}
			</main>

			{/* <footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer> */}
		</div>
	)
}
