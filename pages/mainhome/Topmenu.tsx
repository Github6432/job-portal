import React from 'react';

const Topmenu = () => {
    return (
        <>
            <ul className="flex flex-wrap justify-center mt-3 space-x-0.5 md:space-x-2 mx-auto">
                <li className="flex-grow bg-red-700 text-center p-1 text-xs sm:text-sm md:text-base mx-0.5 md:mx-1">
                    <a href="#" className="text-white">Job</a>
                </li>
                <li className="flex-grow bg-red-700 text-center p-1 text-xs sm:text-sm md:text-base mx-0.5 md:mx-1">
                    <a href="#" className="text-white">Admit Card</a>
                </li>
                <li className="flex-grow bg-red-700 text-center p-1 text-xs sm:text-sm md:text-base mx-0.5 md:mx-1">
                    <a href="#" className="text-white">Answer Key</a>
                </li>
                <li className="flex-grow bg-red-700 text-center p-1 text-xs sm:text-sm md:text-base mx-0.5 md:mx-1">
                    <a href="#" className="text-white">Result</a>
                </li>
                <li className="flex-grow bg-red-700 text-center p-1 text-xs sm:text-sm md:text-base mx-0.5 md:mx-1">
                    <a href="#" className="text-white">Admission</a>
                </li>
                <li className="flex-grow bg-red-700 text-center p-1 text-xs sm:text-sm md:text-base mx-0.5 md:mx-1">
                    <a href="#" className="text-white">Scheme</a>
                </li>
            </ul>


        </>
    );
}

export default Topmenu;
