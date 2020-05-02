import React, {useState} from "react";

export default function ({title, isCollapsed, children}) {
    const [collapsed, setCollapsed] = useState(isCollapsed ? isCollapsed : false);

    return (
        <div>
            <h3 className='mb-1'>{title}</h3>
            <p className='inline-btn'
               style={{cursor: 'pointer', display: 'inline-block'}}
               onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? 'Expand +' : 'Collapse -'}
            </p>
            <div className='mt-1' style={{display: collapsed ? 'none' : 'block'}}>
                {children}
            </div>
        </div>
    )
}