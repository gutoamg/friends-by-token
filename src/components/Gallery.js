import React, { useContext, useEffect, useState } from 'react';
import classNames from '../../styles/Gallery.module.scss';
import NFTDisplay from '../components/NFTDisplay';
import { ScrollContext } from '../contexts/ScrollContext';


const imageURLs = [
	"https://ipfs.pixura.io/ipfs/QmU3Boe8JP6dFHhtgwNsHxcY2Wyo5nQUY4y9vGCnZaaD3t/the-last.jpg",
	"https://ipfs.pixura.io/ipfs/QmRZm3nbnXbwuxFmwBDnkxT5xqFQXTfqjbi6U252PhiZjW/the-physical-impossibility-of-eth-in-the-mind-of-someone-bidding.jpg",
	"https://ipfs.pixura.io/ipfs/QmNht7BAHBbjVY6JTi686BMACpWdPHPHcaPfAFY3nqSvwc/blue-muse-2022.jpg",
	"https://ipfs.pixura.io/ipfs/QmRacym94aEknZFbzaD2xkC4tYXb1B9UPHphoAhSEvHJ8s/eisen-d707xy.jpg",
	"https://ipfs.pixura.io/ipfs/QmU3Boe8JP6dFHhtgwNsHxcY2Wyo5nQUY4y9vGCnZaaD3t/the-last.jpg",
	"https://ipfs.pixura.io/ipfs/QmaQsMRUNu9BLfj7RtmNKVss6mgkq5gS9Eaet5GzQegmeP/time-to-reflect-ii.jpg",
	"https://ipfs.pixura.io/ipfs/QmZ5n9HKbvn2CNwUa6ZJ6GxWyGoTn8XXq2NtvZCYeEZquK/wise-old-tree.jpg",
	"https://ipfs.pixura.io/ipfs/QmZ4VHdp9NKrVCsTb1kCE3aesEX3oMYeWGkQJJ6FNMWCug/land-of-dreams-the-assembly-.jpg",
	"https://ipfs.pixura.io/ipfs/QmbzKthNqvfzgQnCsnMRrA8f2UnsVF1aFw64G9N9HdcJFf/unsolved-puzzle.jpg",
	"https://ipfs.pixura.io/ipfs/QmZNFr2njmpiC6gfh2tsd1QhGs1EREC4KCUUTVdCjdaiQ4/trials.png",
	"https://ipfs.pixura.io/ipfs/QmYzTnCRJRELDC7aUnBD1yxv8EZnhtmAzVBVNy91Fgcn8s/time-does-not-change-all.jpg",
	"https://ipfs.pixura.io/ipfs/QmRKvp3GYhPZnjTpAEwm5Py8VdtS19bd2RcTxHwddCgyfc/the-korova-the-third-wave.jpg"
];

const Gallery = () => {
	let { animation_value, percentageScrolled } = useContext(ScrollContext);
	const [animationValues, setAnimationValues] = useState({
		scale: 0.8,
		opacity: 0,
		containerPos: 'relative',
	});

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


	return (
		<div className={classNames.galleryContainer} style={{
			"position": animationValues.containerPos,
		}}>
			<div className={classNames.gallery} style={{
				"transform": `translate(-50%, -50%) scale3d(${animationValues.scale}, ${animationValues.scale}, 1)`,
				"opacity": `${animationValues.opacity}`,
			}}>
				<div className={classNames.galleryContent}>
					<NFTDisplay classN={classNames.animation1} topPos={50 + Math.random() * 10} leftPos={50 + Math.random() * 10} parentUrl={imageURLs[0]} />
					<NFTDisplay classN={classNames.animation2} topPos={60 + Math.random() * 10} leftPos={60 + Math.random() * 10} parentUrl={imageURLs[1]} />
					<NFTDisplay classN={classNames.animation3} topPos={40 + Math.random() * 10} leftPos={40 + Math.random() * 10} parentUrl={imageURLs[2]} />
					<NFTDisplay classN={classNames.animation4} topPos={60 + Math.random() * 10} leftPos={40 + Math.random() * 10} parentUrl={imageURLs[3]} />
					<NFTDisplay classN={classNames.animation5} topPos={40 + Math.random() * 10} leftPos={60 + Math.random() * 10} parentUrl={imageURLs[4]} />
					<NFTDisplay classN={classNames.animation4} topPos={Math.random() * 80} leftPos={Math.random() * 80} parentUrl={imageURLs[5]} />
					<NFTDisplay classN={classNames.animation2} topPos={Math.random() * 80} leftPos={Math.random() * 80} parentUrl={imageURLs[6]} />
					<NFTDisplay classN={classNames.animation3} topPos={Math.random() * 80} leftPos={Math.random() * 80} parentUrl={imageURLs[7]} />
					<NFTDisplay classN={classNames.animation1} topPos={Math.random() * 80} leftPos={Math.random() * 80} parentUrl={imageURLs[8]} />
				</div>
			</div>
			
		</div>
	)
}

export default Gallery


