import axios from 'axios';

export default async function searchBooks(
	api_key: string | undefined,
	title: string | undefined,
	author: string | undefined,
	isbn: string | undefined
): Promise<any> {
	if (isbn !== '') {
		return await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${api_key}`
		);
	} else if (title !== '' && author !== '') {
		return await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&orderBy=relevance&printType=BOOKS&key=${api_key}`
		);
	} else if (title !== '' && author === '') {
		return await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${title}&orderBy=relevance&printType=BOOKS&key=${api_key}`
		);
	} else if (author !== '' && title === '') {
		return await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&orderBy=relevance&printType=BOOKS&key=${api_key}`
		);
	}
}
