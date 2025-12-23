import Link from 'next/link';
import React from 'react';

const ServiceCard = ({ service }) => {
    const { title, description, image, _id, price } = service;

    return (
        <div className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
            <figure className="px-6 pt-6">
                <img src={image} alt={title} className="rounded-xl h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title text-primary">{title}</h2>
                    <span className="badge badge-secondary font-bold">${price}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
                <div className="card-actions justify-end mt-4">
                    <Link href={`/services/${_id}`}>
                        <button className="btn btn-primary btn-sm px-6">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;