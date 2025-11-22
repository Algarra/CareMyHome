import Image from '@/utils/image';
import { CountryCode } from './types';

const CountryFlag = ({ countryCode, className }: { countryCode: CountryCode; className?: string }) => {
	return (
		<Image
			src={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`}
			alt={`Flag of ${countryCode}`}
			width={40}
			height={30}
			className={className}
		/>
	);
};

export default CountryFlag;
