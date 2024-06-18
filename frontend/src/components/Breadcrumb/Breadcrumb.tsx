import Link from 'next/link';
import React from 'react'

import './breadcrumb.scss'

type Breadcrumb = {
    id: string;
    name: string;
    permalink?: string;
};

interface Props {
    breadcrumbs: Breadcrumb[];
}

const Breadcrumb = ({ breadcrumbs }: Props) => {
    return (
        <div>
            <ul className="breadcrumb">
                {breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                        {breadcrumb.permalink != null ? <Link href={breadcrumb.permalink}>{breadcrumb.name}</Link> : breadcrumb.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Breadcrumb