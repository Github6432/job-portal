import React from 'react'

const Govtlinks = () => {
    return (
        <>
            <section className='my-10'>
                <div className="text-center my-1 p-1 bg-gray-500">All Govt Links</div>
                <div className='flex text-xs justify-center items-start'>
                    <div className='w-full mx-1'>
                        <div className='bg-yellow-800 md:text-lg text-center'>
                            <p className='h-10 p-1'>Job Details</p>
                            <hr />
                            <ul className="grid grid-cols-3 text-xs md:gap-1 text-center justify-center p-1">
                                <li>Job</li>
                                <li>Admit Cart</li>
                                <li>Result</li>
                            </ul>
                        </div>
                        <div className='border border-yellow-800 h-screen'></div>
                    </div>
                    <div className='w-full mx-1'>
                        <div className='bg-yellow-800 md:text-lg text-center'>
                            <p className='h-10 p-1'>Addmission & Answerkey</p>
                            <hr />
                            <ul className="grid grid-cols-2 text-xs md:gap-1 text-center justify-center p-1">
                                <li>Addmission</li>
                                <li>Answer Key</li>
                            </ul>
                        </div>
                        <div className='border border-yellow-800 h-screen'></div>
                    </div>
                    <div className='w-full mx-1'>
                        <div className='bg-yellow-800 md:text-lg text-center'>
                            <p className='h-10 p-1'>Govt Scheme & Documents</p>
                            <hr />
                            <ul className="grid grid-cols-2 text-xs md:gap-1 text-center justify-center p-1">
                                <li>Documents Link</li>
                                <li>Scheme</li>
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