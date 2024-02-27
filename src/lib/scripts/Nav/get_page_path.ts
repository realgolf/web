import { capitalizeFirstLetter } from '$lib/shared/utils/capitalizeFirstLetter';

export function getPagePath(currentPagePath: string) {
	const path = currentPagePath;

	if (path === '/') {
		return '<strong>Home</strong>';
	}

	const pathParts = path.split('/').filter((part) => part !== '');
	let breadcrumbPath = '';

	for (let i = 0; i < pathParts.length; i++) {
		const pathBefore = pathParts.slice(0, i + 1).join('/');
		const isLastSegment = i === pathParts.length - 1;
		const isFirstSegment = i === 0;

		if (isLastSegment) {
			breadcrumbPath += ` ${
				isFirstSegment ? '' : "<span style='color: darkgrey;'>/</span>"
			} <strong>${capitalizeFirstLetter(pathParts[i])}</strong>`;
		} else {
			breadcrumbPath += isFirstSegment
				? ` <a href="/${pathBefore}" style="text-decoration: none;">${capitalizeFirstLetter(
						pathParts[i]
				  )}</a>`
				: ` <span style="color: darkgrey;">/</span> <a href="/${pathBefore}" style="text-decoration: none;">${capitalizeFirstLetter(
						pathParts[i]
				  )}</a>`;
		}
	}

	return breadcrumbPath;
}
