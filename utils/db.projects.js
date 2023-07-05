import mongoose from 'mongoose'

/* 
	A utility function to fetch the last inserted/updated team and 
	make it conform to the format that matches the Team datagrid's shape. 
*/
export const utilGetUserProject = async (Model, id) => {
	try {
		const response = await Model.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(id) }
			},
			{
				$lookup: {
					from: 'users',
					localField: 'manager',
					foreignField: '_id',
					as: 'projManager'
				}
			},
			{
				$lookup: {
					from: 'teams',
					localField: 'teams',
					foreignField: '_id',
					as: 'projTeams'
				}
			},
			{
				$project: {
					teams: 0,
					manager: 0
				}
			}
		])
		console.log('response', response)
		return response
	} catch (error) {
		return error
	}
}
