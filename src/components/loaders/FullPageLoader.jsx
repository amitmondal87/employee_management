import { isWebpSupported } from 'react-image-webp/dist/utils';

const SrlLogoLoader = () => {
	return (
		<div id="preloader">
			<div className="text-center">
				<img src={isWebpSupported ? 'webploader' : 'normalloader'} alt="icon" />
				</div>
			<div className="sk-three-bounce">
            <div className="sk-child sk-bounce1"></div>
            <div className="sk-child sk-bounce2"></div>
            <div className="sk-child sk-bounce3"></div>
        </div>
			
		</div>
	);
};

export default SrlLogoLoader;
