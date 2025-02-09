import supabase from './supabaseConfig';

export const checkUser = async () => {
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		console.error('Ошибка при проверке авторизации:', error);
		return null;
	}
	return data?.session?.user || null;
};
