import { createContext } from "vm";

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
const fetchedImages = [];
const preloadImages = () => {
	for (let image = 0; image < imageURLs.length; image++) {// ------- CHANGE TO 147 images -------
		fetchedImages[image] = new Image();
		fetchedImages[image].src = imageURLs[image];
	}
};
preloadImages();

export const ImagesContext = createContext(fetchedImages);
