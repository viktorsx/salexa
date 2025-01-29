import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';



const Success = async ({ params: {userId}, searchParams}: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);


  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href='/'>
            <Image
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
            />
            </Link>
            <section className='flex flex-col items-center'>
                <Image
                src='/assets/gifs/success.gif'
                height={300}
                width={280}
                alt='success'
                unoptimized
                />
            <h2 className='header mb-6 max-w-[600px] text-center'>
                Vaš <span className='text-green-500'>zahtev je uspešno</span> sačuvan!
            </h2>
            <p> Uskoro ćemo vam se javiti sa više informacija.</p>
            </section>
            <section className='request-details'>
            <p>Requested appointment details:</p>
            <div className='flex items-center gap-3'>
                <Image
                    src={doctor?.image!}
                    alt='doctor'
                    width={100}
                    height={100}
                    className='size-6'
                />
                <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
            </div>
                <div className='flex gap-2'>
                <Image
                    src='/assets/icons/calendar.svg'
                    alt='calendar'
                    width={24}
                    height={24}
                />
                <p>{formatDateTime(appointment.schedule).dateTime}</p>
                </div>
            </section>
            <div className="flex space-x-4">
            <Button variant='outline' className='shad-primary-btn' asChild>
                <Link href={`/patients/${userId}/new-appointment`}>Novo zakazivanje</Link>
            </Button>
            <Button variant='outline' className='shad-secondary-btn' asChild>
                <Link href={`/`}>Nova registracija</Link>
            </Button>
            </div>
            <p className="copyright mt-10 py-10">© 2025 Salcorp</p>
        </div>
    </div>
  )
}

export default Success