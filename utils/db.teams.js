import mongoose from 'mongoose'

/* 
	A utility function to fetch the last inserted/updated team and 
	make it conform to the format that matches the Team datagrid's shape. 
*/
export const utilGetUserTeam = async (Model, id) => {
	try {
		const response = await Model.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(id) }
			},
			{
				$lookup: {
					from: 'users',
					localField: 'leader',
					foreignField: '_id',
					as: 'teamLeader'
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: 'members',
					foreignField: '_id',
					as: 'teamMembers'
				}
			}
		])
		console.log('response', response)
		return response
	} catch (error) {
		return error
	}
}
