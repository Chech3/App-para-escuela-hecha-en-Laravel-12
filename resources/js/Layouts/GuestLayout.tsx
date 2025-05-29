import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col  items-start bg-gray-100 pt-6 sm:justify-center sm:pt-0 bg-[url('/simon.jpeg')] bg-no-repeat bg-cover ">
            {/* <div className='bg-gray-100 ml-24 rounded-md px-6 py-4'>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <div className="mt-6 ml-24 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
