import React from 'react'

const Govtlinks = () => {
    return (
        <>
            <section className='mx-16 my-14'>
                <div className="text-center my-1 bg-gray-500">All Govt Links</div>
                <div className='flex space-x-4  justify-between items-center'>
                    <div className='w-full'>
                        <div className='bg-yellow-800 text-center'>
                            Job Details
                            <hr />
                            <ul className="flex justify-evenly">
                                <li>Job</li>
                                <li>Admit Cart</li>
                                <li>Result</li>
                            </ul>
                        </div>
                        <div className='border border-yellow-800 h-screen'></div>
                    </div>
                    <div className='w-full'>
                        <div className='bg-yellow-800 w-full text-center'>
                            Addmission & Answerkey
                            <hr />
                            <ul className="flex justify-evenly">
                                <li>Addmission</li>
                                <li>Answer Key</li>
                            </ul>
                            </div>
                        <div className='border border-yellow-800 h-screen'></div>
                    </div>
                    <div className='w-full'>
                        <div className='bg-yellow-800 w-full text-center'>
                            Govt Scheme & Documents
                            <hr />
                            <ul className="flex justify-evenly">
                                <li>Govt Documents Link</li>
                                <li>Govt Scheme</li>
                            </ul>
                            </div>
                        <div className='border border-yellow-800 h-screen'></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Govtlinks