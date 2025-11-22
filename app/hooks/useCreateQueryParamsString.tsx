import { useSearchParams } from 'next/navigation';

export const useCreateQueryParamsString = () => {
	const searchParams = useSearchParams();

	const createQueryParamsString = (newParams: { name: string; value: string | null }[]) => {
		const params = new URLSearchParams(searchParams ?? '');
		for (const { value, name } of newParams) {
			if (value) params.set(name, value);
			else params.delete(name);
		}

		return params.toString();
	};

	return { createQueryParamsString };
};
