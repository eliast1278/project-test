
export function makeAuthHeader(type = '') {
	let headerOption = {}
	if (type === '') {
		headerOption = { headers: { needAuth: true } }
	} else if (type === 'xlsx') {
		headerOption = {
			headers: { needAuth: true },
			responseType: 'blob',
			'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		}
	} else if(type === 'json') {
		headerOption = {
			headers: {
				needAuth: true,
				'Content-Type': 'application/json',
			},
		}
	}
	else if (type === 'login') {
		headerOption = {
			headers: {isLogin:true, 'Content-Type': 'application/x-www-form-urlencoded' , 'Authorization': 'Basic bTJtLmNsaWVudDo1MTE1MzZFRi1GMjcwLTQwNTgtODBDQS0xQzg5QzE5MkY2OUE='},
			
		}

	} 
	else if (type === 'register') {
		headerOption = {
			headers: {isRegister:true, 'Content-Type': 'application/x-www-form-urlencoded' },
			
		}

	} 
	// else if (type === 'changeUrl') {
	// 	headerOption = {
	// 		headers: {
	// 			changeUrl: info.urlKey,
	// 		},
	// 	}
	// }
	return headerOption
}