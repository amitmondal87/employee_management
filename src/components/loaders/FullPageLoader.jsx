import { isWebpSupported } from 'react-image-webp/dist/utils';

const SrlLogoLoader = () => {
	return (
		<div id="preloader">
			<div className="text-center">
				<img src={isWebpSupported ? 'webploader' : 'normalloader'} alt="icon" />
				</div>
			<div class="sk-three-bounce">
            <div class="sk-child sk-bounce1"></div>
            <div class="sk-child sk-bounce2"></div>
            <div class="sk-child sk-bounce3"></div>
        </div>
			
		</div>
	);
};

export default SrlLogoLoader;
