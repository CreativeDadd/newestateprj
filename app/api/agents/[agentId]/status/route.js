// // app/api/agents/[email]/status/route.js
// import connectToDatabase from '@/app/lib/mongodb';
// import Agent from '@/app/models/Agent';

// export async function GET(req, { params }) {
//   const { email } = params;
//   await connectToDatabase();

//   try {
//     const agent = await Agent.findOne({ email }).lean();
    
//     if (!agent) {
//       return new Response(JSON.stringify({ message: 'Agent not found' }), { status: 404 });
//     }

//     return new Response(JSON.stringify({ isApproved: agent.isApproved, agentId: agent._id }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Error fetching agent status' }), { status: 500 });
//   }
// }













// app/api/agents/[email]/status/route.js
import Agent from '@/app/models/Agent';
import connectToDatabase from '@/app/lib/mongodb';

export async function GET(req, { params }) {
  await connectToDatabase();

  const {agentId} = params; 
  const agent = await Agent.findOne({ agentId });

  if (!agent) {
    return new Response(JSON.stringify({ message: 'Agent not found' }), { status: 404 });
  }

  return new Response(
    JSON.stringify({
      agentId: agent._id,
      isApproved: agent.isApproved,
    }),
    { status: 200 }
  );
}