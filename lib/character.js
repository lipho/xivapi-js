// https://xivapi.com/docs/Character
const Lib = require('./Lib')

class Character extends Lib {
	constructor(parent) {
		super(parent)
	}

	/*
	{
		server	string	optional
		page		int			optional
	}
	*/
	search(name, params = {}) {
		if(typeof(name) === 'undefined')
			return Error('name must be defined')
		if(params.server && !this.parent.resources.servers.includes(this.parent.utils.firstCapital(params.server)))
			return Error('server not valid')

		this.req(
			'character/search',
			Object.assign(params, {name:name})
		).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}

	/*
	{
		data
		columns
	}
	*/
	get(id, params = {}) {
		if(typeof(id) === 'undefined')
			Error('id must be defined')

		this.req(
			'character/' + id,
			params
		).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}

	/*
	token	optional
	*/
	verification(id, token) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				Error('id must be defined')

			this.req(
				`character/${id}/verification`,
				{token: token}
			).then((res) => {
				if(token)
					resolve(res.Pass)
				else
					resolve(res.Bio)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = Character