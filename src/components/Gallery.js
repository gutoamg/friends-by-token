import React, { useContext, useEffect, useState } from 'react';
import classNames from '../../styles/Gallery.module.scss';
import NFTDisplay from '../components/NFTDisplay';
import { ScrollContext } from '../contexts/ScrollContext';
import { UserContext } from '../contexts/UserContext';


const imageURLs = [
	"https://ipfs.pixura.io/ipfs/QmU3Boe8JP6dFHhtgwNsHxcY2Wyo5nQUY4y9vGCnZaaD3t/the-last.jpg",
	"https://ipfs.pixura.io/ipfs/QmRZm3nbnXbwuxFmwBDnkxT5xqFQXTfqjbi6U252PhiZjW/the-physical-impossibility-of-eth-in-the-mind-of-someone-bidding.jpg",
	"https://ipfs.pixura.io/ipfs/QmNht7BAHBbjVY6JTi686BMACpWdPHPHcaPfAFY3nqSvwc/blue-muse-2022.jpg",
	"https://ipfs.pixura.io/ipfs/QmRacym94aEknZFbzaD2xkC4tYXb1B9UPHphoAhSEvHJ8s/eisen-d707xy.jpg",
	"https://ipfs.pixura.io/ipfs/Qmb9xR5doZqmNmXbWRkJYhDxZx2ZXXhLmduxsyA2Wc1PWe/god-mode.jpg",
	"https://ipfs.pixura.io/ipfs/QmaQsMRUNu9BLfj7RtmNKVss6mgkq5gS9Eaet5GzQegmeP/time-to-reflect-ii.jpg",
	"https://ipfs.pixura.io/ipfs/QmZ5n9HKbvn2CNwUa6ZJ6GxWyGoTn8XXq2NtvZCYeEZquK/wise-old-tree.jpg",
	"https://ipfs.pixura.io/ipfs/QmZ4VHdp9NKrVCsTb1kCE3aesEX3oMYeWGkQJJ6FNMWCug/land-of-dreams-the-assembly-.jpg",
	"https://ipfs.pixura.io/ipfs/QmbzKthNqvfzgQnCsnMRrA8f2UnsVF1aFw64G9N9HdcJFf/unsolved-puzzle.jpg",
	"https://ipfs.pixura.io/ipfs/QmZNFr2njmpiC6gfh2tsd1QhGs1EREC4KCUUTVdCjdaiQ4/trials.png",
	"https://ipfs.pixura.io/ipfs/QmYzTnCRJRELDC7aUnBD1yxv8EZnhtmAzVBVNy91Fgcn8s/time-does-not-change-all.jpg",
	"https://ipfs.pixura.io/ipfs/QmRKvp3GYhPZnjTpAEwm5Py8VdtS19bd2RcTxHwddCgyfc/the-korova-the-third-wave.jpg",
	"https://ipfs.pixura.io/ipfs/QmWgeBRuaaqcpgKoosyRSRRUsjAyTu87j1QAMjJxBU6tb5/neo-noir-new-york-silent-solitude-.jpg",// hkjh
	"https://ipfs.pixura.io/ipfs/QmYozTRu5wG8A3Jzg6zkdasSeBPwf3yr5AMhwgK52fGCRj/horse.png",
	"https://ipfs.pixura.io/ipfs/QmcDT44BdoEAn6FKt96RVmr2CQHapbVyiYM3iykTtxbN4K/sun-dance.jpg",
	"https://ipfs.pixura.io/ipfs/QmPAxArMpBfNKvLywR3APcQgNzwdf5NcsX9YdXV1iRhq5c/tales-of-wolves-and-light.jpg"
];

const Gallery = () => {
	let { animation_value, percentageScrolled } = useContext(ScrollContext);
	let { userInfo } = useContext(UserContext);
	const [animationValues, setAnimationValues] = useState({
		scale: 0.8,
		opacity: 0,
		containerPos: 'relative',
	});
	const [lastScrollPos, setLastScrollPos] = useState(0);
	const [imgPositions, setImgPositions] = useState({
		center: 45 + Math.random() * 15,
		diagBottom: 70 + Math.random() * 15,
		diagTop: 10 + Math.random() * 5,
		random1: 70 + Math.random() * 10,
		random2: 20 + Math.random() * 10,
		random3: 10 + Math.random() * 5,
		random4: 50 + Math.random() * 5,
		random5: Math.random() * 80,
		random6: Math.random() * 80,
		random7: Math.random() * 80,
		random8: 80 + Math.random() * 5,
		random9: 85 + Math.random() * 5,
	});
	const [friendsValues, setFriendsValues] = useState({
		dimensions: 80,
		top: 100,
		left: 100,
		transform: 105,
		borderRadius: 50,
	});
	const [contOpacity, setContOpacity] = useState(0);

	const containerVisibility = () => {
		if (contOpacity === 1) {
			const topPos = friendsValues.top;
			const leftPos = friendsValues.left;
			const ts = friendsValues.transform;
			setFriendsValues({
				dimensions: 80,
				top: topPos,
				left: leftPos,
				transform: ts,
				borderRadius: 50,
			});
		}
		if (friendsValues.dimensions === 80) {
			setFriendsValues({
				dimensions: 300,
				top: 100,
				left: 100,
				transform: 105,
				borderRadius: 5
			});
		}
	}

	useEffect(() => {
		if ((percentageScrolled - lastScrollPos) > 0.1 || (percentageScrolled - lastScrollPos) < -0.1) {
			setLastScrollPos(percentageScrolled);
			setImgPositions({
				center: 45 + Math.random() * 15,
				diagBottom: 70 + Math.random() * 15,
				diagTop: 10 + Math.random() * 5,
				random1: 70 + Math.random() * 10,
				random2: 20 + Math.random() * 10,
				random3: 10 + Math.random() * 5,
				random4: 50 + Math.random() * 5,
				random5: Math.random() * 80,
				random6: Math.random() * 80,
				random7: Math.random() * 80,
				random8: 80 + Math.random() * 5,
				random9: 85 + Math.random() * 5,
			});
		}
	}, [percentageScrolled]);


	useEffect(() => {
		const newScale = animation_value(0.6, 1, percentageScrolled, 0.8, 1);
		const newOpacity = animation_value(0.6, 1, percentageScrolled, 0, 1);
		let newContainerPos = 'relative';
		if (percentageScrolled > 0.8) newContainerPos = 'fixed';
		setAnimationValues({
			scale: newScale,
			opacity: newOpacity,
			containerPos: newContainerPos,
		});
	}, [percentageScrolled, animation_value]);

	useEffect(() => {
		console.log(userInfo);
		if (userInfo.imagesClicked.length >= 4) {
			setContOpacity(1);
			setFriendsValues({
				dimensions: 300,
				top: 100,
				left: 100,
				transform: 105,
				borderRadius: 5
			});
		}
	}, [userInfo]);



	return (
		<div className={classNames.galleryContainer} style={{
			"position": animationValues.containerPos,
		}}>
			<div className={classNames.gallery} style={{
				"transform": `translate(-50%, -50%) scale3d(${animationValues.scale}, ${animationValues.scale}, 1)`,
				"opacity": `${animationValues.opacity}`,
			}}>
				<div className={classNames.galleryContent}>
					<NFTDisplay classN={classNames.animation1} topPos={imgPositions.center} leftPos={imgPositions.center} parentUrl={imageURLs[0]} />
					<NFTDisplay classN={classNames.animation2} topPos={imgPositions.diagBottom} leftPos={imgPositions.diagBottom} parentUrl={imageURLs[1]} />
					<NFTDisplay classN={classNames.animation3} topPos={imgPositions.diagTop} leftPos={imgPositions.diagTop} parentUrl={imageURLs[2]} />
					<NFTDisplay classN={classNames.animation4} topPos={imgPositions.random1} leftPos={imgPositions.random2} parentUrl={imageURLs[3]} />
					<NFTDisplay classN={classNames.animation5} topPos={imgPositions.random2} leftPos={imgPositions.random1} parentUrl={imageURLs[4]} />
					<NFTDisplay classN={classNames.animation4} topPos={imgPositions.random3} leftPos={imgPositions.random4} parentUrl={imageURLs[5]} />
					<NFTDisplay classN={classNames.animation2} topPos={imgPositions.random5} leftPos={imgPositions.random6} parentUrl={imageURLs[6]} />
					<NFTDisplay classN={classNames.animation3} topPos={imgPositions.random7} leftPos={imgPositions.random8} parentUrl={imageURLs[7]} />
					<NFTDisplay classN={classNames.animation1} topPos={imgPositions.random9} leftPos={imgPositions.random4} parentUrl={imageURLs[8]} />
					
					<NFTDisplay classN={classNames.animation3} topPos={imgPositions.random7} leftPos={imgPositions.random4} parentUrl={imageURLs[9]} />
					<NFTDisplay classN={classNames.animation1} topPos={imgPositions.random7} leftPos={imgPositions.diagTop} parentUrl={imageURLs[10]} />
					<NFTDisplay classN={classNames.animation3} topPos={imgPositions.random4} leftPos={imgPositions.random6} parentUrl={imageURLs[11]} />
					<NFTDisplay classN={classNames.animation2} topPos={imgPositions.random2} leftPos={imgPositions.random5} parentUrl={imageURLs[12]} />
					<NFTDisplay classN={classNames.animation4} topPos={imgPositions.random5} leftPos={imgPositions.random4} parentUrl={imageURLs[13]} />
					<NFTDisplay classN={classNames.animation4} topPos={imgPositions.random8} leftPos={imgPositions.random2} parentUrl={imageURLs[14]} />
					<NFTDisplay classN={classNames.animation5} topPos={imgPositions.random9} leftPos={imgPositions.center} parentUrl={imageURLs[15]} />
				</div>
			</div>
			<div className={`${classNames.friendsContainer} ${classNames.friendsContainer}`}
				onClick={containerVisibility}
				style={{
					"opacity": contOpacity,
					"height": `${friendsValues.dimensions}px`,
					"width": `${friendsValues.dimensions}px`,
					"top": `${friendsValues.top}%`,
					"left": `${friendsValues.left}%`,
					"transform": `translate(-${friendsValues.transform}%, -${friendsValues.transform}%)`,
					"borderRadius": `${friendsValues.borderRadius}%`
				}}
			>
				<h1 className={classNames.friendsTitle}>Hey {userInfo.email}, those are your new friends:</h1>
				<p className={classNames.friendEmail}>notfake@coldmail.com</p>
				<p className={classNames.friendEmail}>alwaystruthful@coldmail.com</p>
				<p className={classNames.friendEmail}>mrrobot@dotnet.com</p>
				<p className={classNames.friendEmail}>coined@omail.com</p>
				<p className={classNames.friendEmail}>messageme@msn.com</p>
			</div>
		</div>
	)
}

export default Gallery


