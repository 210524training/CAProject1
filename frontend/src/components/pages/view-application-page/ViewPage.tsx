import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Application, { approval } from "../../../models/application";
import User from "../../../models/user";
import { getApps, getBySupervisor, getByDepartment, deleteApp } from "../../../remote/backend/TRM.api";
import TRMClient from "../../../remote/backend/TRM.client";
import '../register-page/RegisterPage.css'

type Props = {
    currentUser?: User,
}

const ViewApplicationsPage: React.FC<Props> = (props) => {

    const [allApplications, setAllApplications] = useState<Application[]>([]);
    const [benCoApproval, setBenCoApproval] = useState<approval>();
    const [BCToEm, setBCToEm] = useState<string>();
    const [adjustedAmount, setAdjustedAmount] = useState<number>();
    const [BCToS, setBCToS] = useState<string>();
    const [BCToH, setBCToH] = useState<string>();
    const [appID, setAppID] = useState<string>();
    const [selectedAppBen, setSelectedAppBen] = useState<Application>();
    const [benCoGApproval, setBenCoGApproval] = useState<approval>();
    const [superApplications, setSuperApplications] = useState<Application[]>([]);
    const [special, setSpecial] = useState<string>();
    const [specialBool, setSpecialBool] = useState<boolean>();
    const [headApplications, setHeadApplications] = useState<Application[]>([]);
    const [selectedAppSup, setSelectedAppSup] = useState<Application>();
    const [selectedAppHead, setSelectedAppHead] = useState<Application>();
    const [doubleApprove, setDoubleApp] = useState<approval>();
    const [empApplications, setEmpApplications] = useState<Application[]>([]);
    const [selectedAppEmp, setSelectedAppEmp] = useState<Application>();
    const [appID2, setAppID2] = useState<string>();
    const [selectedAppEmp2, setSelectedAppEmp2] = useState<Application>();
    const [AG, setAG] = useState<string>();
    const [gradeFile, setGradeFile] = useState<File>();

    const handleBenCoAppChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setBenCoApproval(e.target.value as approval);
    }

    const handleDoubleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDoubleApp(e.target.value as approval);
    }

    const handleBenCoGAppChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setBenCoGApproval(e.target.value as approval);
    }

    const handleSpecialChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSpecial(e.target.value as approval);
    }

    const handleBCToEmChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBCToEm(e.target.value);
    }

    const handleBCToSChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBCToS(e.target.value);
    }

    const handleBCToHChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBCToH(e.target.value);
    }

    const handleAdjustedAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdjustedAmount(e.target.value as unknown as number);
    };

    const handleAppID = (e: ChangeEvent<HTMLInputElement>) => {
        setAppID(e.target.value);
    }

    const handleAppID2 = (e: ChangeEvent<HTMLInputElement>) => {
        setAppID2(e.target.value);
    }

    const handleAGChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAG(e.target.value);
    }

    const handleGFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
        setGradeFile(e.target.files[0]);}
    }

    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const app = selectedAppEmp2;
        if (app) {
            const response = await deleteApp(app.id);
            console.log(response);
        }
        else {
            console.log('failed')
        }
    }

    const handleUpdateBen = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const app = selectedAppBen;
        if (app) {
            const response = await TRMClient.put<boolean>('api/v1/applications', {
                username: app.username,
                name: app.name,
                email: app.email,
                id: app.id,
                supervisorApproval: app.supervisorApproval,
                benCoApproval: benCoApproval,
                headApproval: app.headApproval,
                courseName: app.courseName,
                courseType: app.courseType,
                amount: app.amount,
                adjustedAmount: adjustedAmount,
                appDate: app.appDate,
                courseDate: app.courseDate,
                courseLocation: app.courseLocation,
                gradeType: app.gradeType,
                gradeApproval: benCoGApproval,
                gradeDescription: app.gradeDescription,
                justification: app.justification,
                courseDescription: app.courseDescription,
                urgent: app.urgent,
                specialApproval: app.specialApproval,
                grade: app.grade,
                startFile: app.startFile,
                secondFile: app.secondFile,
                preapprovalDescription: app.preapprovalDescription,
                missedWorkDesc: app.missedWorkDesc,
                SToEm: app.SToEm,
                EmToS: app.EmToS,
                HToEm: app.HToEm,
                EmToH: app.EmToH,
                HToS: app.HToS,
                SToH: app.SToH,
                BCToEm: BCToEm,
                EmToBC: app.EmToBC,
                BCToS: BCToS,
                SToBC: app.SToBC,
                BCToH: BCToH,
                HToBC: app.HToBC,
            });
            console.log(response);
        }
        else {
            console.log('failed')
        }
    }

    const handleUpdateHead = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const app = selectedAppHead;
        if (app) {
            const response = await TRMClient.put<boolean>('api/v1/applications', {
                username: app.username,
                name: app.name,
                email: app.email,
                id: app.id,
                supervisorApproval: doubleApprove,
                benCoApproval: app.benCoApproval,
                headApproval: benCoApproval,
                courseName: app.courseName,
                courseType: app.courseType,
                amount: app.amount,
                adjustedAmount: app.adjustedAmount,
                appDate: app.appDate,
                courseDate: app.courseDate,
                courseLocation: app.courseLocation,
                gradeType: app.gradeType,
                gradeApproval: app.gradeApproval,
                gradeDescription: app.gradeDescription,
                justification: app.justification,
                courseDescription: app.courseDescription,
                urgent: app.urgent,
                specialApproval: app.specialApproval,
                grade: app.grade,
                startFile: app.startFile,
                secondFile: app.secondFile,
                preapprovalDescription: app.preapprovalDescription,
                missedWorkDesc: app.missedWorkDesc,
                SToEm: app.SToEm,
                EmToS: app.EmToS,
                HToEm: BCToEm,
                EmToH: app.EmToH,
                HToS: BCToH,
                SToH: app.SToH,
                BCToEm: app.BCToEm,
                EmToBC: app.EmToBC,
                BCToS: app.BCToS,
                SToBC: app.SToBC,
                BCToH: app.BCToH,
                HToBC: BCToS,
            });
            console.log(response);
        }
        else {
            console.log('failed')
        }
    }

    const handleUpdateSup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const app = selectedAppSup;
        if (app) {
            const response = await TRMClient.put<boolean>('api/v1/applications', {
                username: app.username,
                name: app.name,
                email: app.email,
                id: app.id,
                supervisorApproval: benCoApproval,
                benCoApproval: app.benCoApproval,
                headApproval: app.headApproval,
                courseName: app.courseName,
                courseType: app.courseType,
                amount: app.amount,
                adjustedAmount: app.adjustedAmount,
                appDate: app.appDate,
                courseDate: app.courseDate,
                courseLocation: app.courseLocation,
                gradeType: app.gradeType,
                gradeApproval: app.gradeApproval,
                gradeDescription: app.gradeDescription,
                justification: app.justification,
                courseDescription: app.courseDescription,
                urgent: app.urgent,
                specialApproval: specialBool,
                grade: app.grade,
                startFile: app.startFile,
                secondFile: app.secondFile,
                preapprovalDescription: app.preapprovalDescription,
                missedWorkDesc: app.missedWorkDesc,
                SToEm: BCToEm,
                EmToS: app.EmToS,
                HToEm: app.HToEm,
                EmToH: app.EmToH,
                HToS: app.HToS,
                SToH: BCToH,
                BCToEm: app.BCToEm,
                EmToBC: app.EmToBC,
                BCToS: app.BCToS,
                SToBC: BCToS,
                BCToH: app.BCToH,
                HToBC: app.HToBC,
            });
            console.log(response);
        }
        else {
            console.log('failed')
        }
    }

    const handleUpdateEmp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const app = selectedAppEmp;
        if (app) {
            const response = await TRMClient.put<boolean>('api/v1/applications', {
                username: app.username,
                name: app.name,
                email: app.email,
                id: app.id,
                supervisorApproval: app.supervisorApproval,
                benCoApproval: app.benCoApproval,
                headApproval: app.headApproval,
                courseName: app.courseName,
                courseType: app.courseType,
                amount: app.amount,
                adjustedAmount: app.adjustedAmount,
                appDate: app.appDate,
                courseDate: app.courseDate,
                courseLocation: app.courseLocation,
                gradeType: app.gradeType,
                gradeApproval: app.gradeApproval,
                gradeDescription: app.gradeDescription,
                justification: app.justification,
                courseDescription: app.courseDescription,
                urgent: app.urgent,
                specialApproval: app.specialApproval,
                grade: AG,
                startFile: app.startFile,
                secondFile: gradeFile,
                preapprovalDescription: app.preapprovalDescription,
                missedWorkDesc: app.missedWorkDesc,
                SToEm: app.SToEm,
                EmToS: BCToEm,
                HToEm: app.HToEm,
                EmToH: BCToH,
                HToS: app.HToS,
                SToH: app.SToH,
                BCToEm: app.BCToEm,
                EmToBC: BCToS,
                BCToS: app.BCToS,
                SToBC: app.SToBC,
                BCToH: app.BCToH,
                HToBC: app.HToBC,
            });
            console.log(response);
        }
        else {
            console.log('failed')
        }
    }

    useEffect(() => {
        if (props.currentUser?.userClass === 'BenCo') {
            let currentAppBen = allApplications.find(obj => {
                return obj.id === appID;
            })
            setSelectedAppBen(currentAppBen);
        }
    }, [appID])

    useEffect(() => {
        if (props.currentUser?.userClass === 'Employee') {
            let currentAppEmp = empApplications.find(obj => {
                return obj.id === appID;
            })
            setSelectedAppEmp(currentAppEmp);
        }
    }, [appID])

    useEffect(() => {
        if (props.currentUser?.userClass === 'Employee') {
            let currentAppEmp2 = empApplications.find(obj => {
                return obj.id === appID2;
            })
            setSelectedAppEmp2(currentAppEmp2);
        }
    }, [appID2])

    useEffect(() => {
        if (props.currentUser?.userClass === 'Supervisor') {
            let currentAppSup = superApplications.find(obj => {
                return obj.id === appID;
            })
            setSelectedAppSup(currentAppSup);
        }
    }, [appID])

    useEffect(() => {
        if (props.currentUser?.userClass === 'Head') {
            let currentAppHead = headApplications.find(obj => {
                return obj.id === appID;
            })
            setSelectedAppHead(currentAppHead);
        }
    }, [appID])

    useEffect(() => {
        if (special === 'Approved') {
            setSpecialBool(true);
        }
        else {
            setSpecialBool(false);
        }
    }, [special])

    useEffect(() => {
        if (props.currentUser?.userClass === 'BenCo') {
            (async function BenCoApps(): Promise<void> {
                const allApps = await getApps();
                setAllApplications(allApps);
            })()
        }
    }, []);

    useEffect(() => {
        if (props.currentUser?.userClass === 'Supervisor') {
            (async function SuperApps(): Promise<void> {
                if (props.currentUser) {
                    const superUsers = await getBySupervisor(props.currentUser?.username);
                    if (superUsers) {
                        let supUsernames = superUsers.map(u => u.username);
                        const app = await getApps();
                        const supapps = app.filter(function (a) {
                            return supUsernames.includes(a.username)
                        })
                        if (supapps) {
                            setSuperApplications(supapps);
                        }
                    }
                }
            })()
        }
    }, []);

    useEffect(() => {
        if (props.currentUser?.userClass === 'Head') {
            (async function HeadApps(): Promise<void> {
                if (props.currentUser) {
                    const headUsers = await getByDepartment(props.currentUser?.department);
                    if (headUsers) {
                        let headUsernames = headUsers.map(u => u.username);
                        const headApps = await getApps();
                        const newapps = headApps.filter(function (a) {
                            return headUsernames.includes(a.username)
                        })
                        if (newapps) {
                            setHeadApplications(newapps);
                        }
                    }
                }
            })()
        }
    }, []);

    useEffect(() => {
        if (props.currentUser?.userClass === 'Employee') {
            (async function EmpApps(): Promise<void> {
                if (props.currentUser) {
                    const apps = await getApps();
                    const empapps = apps.filter(function (a) {
                        return a.username === props.currentUser?.username;
                    })
                    if (empapps) {
                        setEmpApplications(empapps);
                    }
                }
            })()
        }
    }, []);

    const appDisplaySup = superApplications.map((app: Application) => (
        <>
            <tr>
                <td>Application ID: {app.id}</td>
                <td>Urgent: {(Date.now() >= (new Date(app.courseDate).getTime() - (1000 * 60 * 60 * 24 * 7 * 2))) ? 'Yes' : 'No'}</td>
                <td>Employee Username: {app.username}</td>
                <td>Employee Name: {app.name}</td>
                <td>Employee Email: {app.email}</td>
            </tr>
            <tr>
                <td>Supervisor Approval: {app.supervisorApproval}</td>
                <td>BenCo Approval: {app.benCoApproval}</td>
                <td>Dept. Head Approval: {app.headApproval}</td>
            </tr>
            <tr>
                <td>Course Name: {app.courseName}</td>
                <td>Course Type: {app.courseType}</td>
                <td>Course Date: {app.courseDate}</td>
                <td>Course Description: {app.courseDescription}</td>
                <td>Course Location: {app.courseLocation}</td>
                <td>Eligible Reimbursement: {app.adjustedAmount}</td>
            </tr>
            <tr>
                <td>Grade Type: {app.gradeType}</td>
                <td>Achieved Grade: {app.grade}</td>
                <td>Grade Description/Cutoff: {app.gradeDescription ? app.gradeDescription : 'Defaults: C, 70% (or equivalent score, rounding up), presentation approved.'}</td>
                <td>Grade Approval: {app.gradeApproval}</td>
                <td>Supervisor Approved Presentation: {app.specialApproval ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
                <td>Justification: {app.justification}</td>
                <td>Preapproval Information: {app.preapprovalDescription}</td>
                <td>Missed Work Description: {app.missedWorkDesc}</td>
            </tr>
            <tr>
                <td>Employee Message: {app.EmToS}</td>
                <td>Message to Employee: {app.SToEm}</td>
                <td>BenCo Message: {app.BCToS}</td>
                <td>Message to BenCo: {app.SToBC}</td>
                <td>Dept. Head Message: {app.HToS}</td>
                <td>Message to Dept. Head: {app.SToH}</td>
            </tr>
            <tr><td id="spacer"></td></tr>
        </>
    ))


    const appDisplayEmp = empApplications.map((app: Application) => (
        <>
            <tr>
                <td>Application ID: {app.id}</td>
                <td>Urgent: {(Date.now() >= (new Date(app.courseDate).getTime() - (1000 * 60 * 60 * 24 * 7 * 2))) ? 'Yes' : 'No'}</td>
                <td>Employee Username: {app.username}</td>
                <td>Employee Name: {app.name}</td>
                <td>Employee Email: {app.email}</td>
            </tr>
            <tr>
                <td>Supervisor Approval: {app.supervisorApproval}</td>
                <td>BenCo Approval: {app.benCoApproval}</td>
                <td>Dept. Head Approval: {app.headApproval}</td>
            </tr>
            <tr>
                <td>Course Name: {app.courseName}</td>
                <td>Course Type: {app.courseType}</td>
                <td>Course Date: {app.courseDate}</td>
                <td>Course Description: {app.courseDescription}</td>
                <td>Course Location: {app.courseLocation}</td>
                <td>Eligible Reimbursement: {app.adjustedAmount}</td>
            </tr>
            <tr>
                <td>Grade Type: {app.gradeType}</td>
                <td>Achieved Grade: {app.grade}</td>
                <td>Grade Description/Cutoff: {app.gradeDescription ? app.gradeDescription : 'Defaults: C, 70% (or equivalent score, rounding up), presentation approved.'}</td>
                <td>Grade Approval: {app.gradeApproval}</td>
                <td>Supervisor Approved Presentation: {app.specialApproval ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
                <td>Justification: {app.justification}</td>
                <td>Preapproval Information: {app.preapprovalDescription}</td>
                <td>Missed Work Description: {app.missedWorkDesc}</td>
            </tr>
            <tr>
                <td>Supervisor Message: {app.SToEm}</td>
                <td>Message to Supervisor: {app.EmToS}</td>
                <td>BenCo Message: {app.BCToEm}</td>
                <td>Message to BenCo: {app.EmToBC}</td>
                <td>Dept. Head Message: {app.HToEm}</td>
                <td>Message to Dept. Head: {app.EmToH}</td>
            </tr>
            <tr><td id="spacer"></td></tr>
        </>
    ))

    const appDisplayHead = headApplications.map((app: Application) => (
        <>
            <tr>
                <td>Application ID: {app.id}</td>
                <td>Urgent: {(Date.now() >= (new Date(app.courseDate).getTime() - (1000 * 60 * 60 * 24 * 7 * 2))) ? 'Yes' : 'No'}</td>
                <td>Employee Username: {app.username}</td>
                <td>Employee Name: {app.name}</td>
                <td>Employee Email: {app.email}</td>
            </tr>
            <tr>
                <td>Supervisor Approval: {app.supervisorApproval}</td>
                <td>BenCo Approval: {app.benCoApproval}</td>
                <td>Dept. Head Approval: {app.headApproval}</td>
            </tr>
            <tr>
                <td>Course Name: {app.courseName}</td>
                <td>Course Type: {app.courseType}</td>
                <td>Course Date: {app.courseDate}</td>
                <td>Course Description: {app.courseDescription}</td>
                <td>Course Location: {app.courseLocation}</td>
                <td>Eligible Reimbursement: {app.adjustedAmount}</td>
            </tr>
            <tr>
                <td>Grade Type: {app.gradeType}</td>
                <td>Achieved Grade: {app.grade}</td>
                <td>Grade Description/Cutoff: {app.gradeDescription ? app.gradeDescription : 'Defaults: C, 70% (or equivalent score, rounding up), presentation approved.'}</td>
                <td>Grade Approval: {app.gradeApproval}</td>
                <td>Supervisor Approved Presentation: {app.specialApproval ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
                <td>Justification: {app.justification}</td>
                <td>Preapproval Information: {app.preapprovalDescription}</td>
                <td>Missed Work Description: {app.missedWorkDesc}</td>
            </tr>
            <tr>
                <td>Employee Message: {app.EmToH}</td>
                <td>Message to Employee: {app.HToEm}</td>
                <td>BenCo Message: {app.BCToH}</td>
                <td>Message to BenCo: {app.HToBC}</td>
                <td>Direct Supervisor Message: {app.SToH}</td>
                <td>Message to Direct Supervisor: {app.HToS}</td>
            </tr>
            <tr><td id="spacer"></td></tr>
        </>
    ))

    const appDisplayBen = allApplications.map((app: Application) => (
        <>
            <tr>
                <td>Application ID: {app.id}</td>
                <td>Urgent: {(Date.now() >= (new Date(app.courseDate).getTime() - (1000 * 60 * 60 * 24 * 7 * 2))) ? 'Yes' : 'No'}</td>
                <td>Employee Username: {app.username}</td>
                <td>Employee Name: {app.name}</td>
                <td>Employee Email: {app.email}</td>
            </tr>
            <tr>
                <td>Supervisor Approval: {app.supervisorApproval}</td>
                <td>BenCo Approval: {app.benCoApproval}</td>
                <td>Dept. Head Approval: {app.headApproval}</td>
            </tr>
            <tr>
                <td>Course Name: {app.courseName}</td>
                <td>Course Type: {app.courseType}</td>
                <td>Course Date: {app.courseDate}</td>
                <td>Course Description: {app.courseDescription}</td>
                <td>Course Location: {app.courseLocation}</td>
                <td>Eligible Reimbursement: {app.adjustedAmount}</td>
            </tr>
            <tr>
                <td>Grade Type: {app.gradeType}</td>
                <td>Achieved Grade: {app.grade}</td>
                <td>Grade Description/Cutoff: {app.gradeDescription ? app.gradeDescription : 'Defaults: C, 70% (or equivalent score, rounding up), presentation approved.'}</td>
                <td>Grade Approval: {app.gradeApproval}</td>
                <td>Supervisor Approved Presentation: {app.specialApproval ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
                <td>Justification: {app.justification}</td>
                <td>Preapproval Information: {app.preapprovalDescription}</td>
                <td>Missed Work Description: {app.missedWorkDesc}</td>
            </tr>
            <tr>
                <td>Employee Message: {app.EmToBC}</td>
                <td>Message to Employee: {app.BCToEm}</td>
                <td>Supervisor Message: {app.SToBC}</td>
                <td>Message to Superviser: {app.BCToS}</td>
                <td>Dept. Head Message: {app.HToBC}</td>
                <td>Message to Dept. Head: {app.BCToH}</td>
            </tr>
            <tr><td id="spacer"></td></tr>
        </>
    ))

    if (props.currentUser?.userClass === 'BenCo') {
        return (
            <div id="whole">
                <br></br>
                <br></br>
                <br></br>
                <table className="appPresent">
                    <tbody>
                        {appDisplayBen}
                    </tbody>
                </table>
                <div>
                    <form onSubmit={handleUpdateBen}>
                        <div className="mb-3">
                            <label htmlFor="selectedAppt" className="form-label">ID of Application to Update</label>
                            <input type="text" className="form-control" id="appID"
                                onChange={handleAppID} />
                        </div>
                        <div>
                            <label htmlFor="approvalSelect" className="form-label">Approval</label>
                            <select name="benCoApprove" id="benCoAppInput" defaultValue='Pending' onChange={handleBenCoAppChange}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gradeApprovalSelect" className="form-label">Grade Approval</label>
                            <select name="benCoGApprove" id="benCoGAppInput" defaultValue='Pending' onChange={handleBenCoGAppChange}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="adjustedAmountInput" className="form-label">Approved Reimbursement</label>
                            <input type="number" className="form-control" id="adjustedAmountInput" onChange={handleAdjustedAmountChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="EmpComment" className="form-label">Comment for Employee:</label>
                            <input type="text" className="form-control" id="benCoToEmp"
                                onChange={handleBCToEmChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="SuperComment" className="form-label">Comment for Supervisor:</label>
                            <input type="text" className="form-control" id="BCToS"
                                onChange={handleBCToSChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="HeadComment" className="form-label">Comment for Dept. Head:</label>
                            <input type="text" className="form-control" id="benCoToHead"
                                onChange={handleBCToHChange} />
                        </div>
                        <input type="submit" className="btn btn-primary" value='Submit' />
                    </form>
                </div>
            </div>)
    }
    else if (props.currentUser?.userClass === 'Supervisor') {
        return (<div id="whole">
            <br></br>
            <br></br>
            <br></br>
            <table>
                <tbody>
                    {appDisplaySup}
                </tbody>
            </table>
            <div>
                <form onSubmit={handleUpdateSup}>
                    <div className="mb-3">
                        <label htmlFor="selectedAppt" className="form-label">ID of Application to Update</label>
                        <input type="text" className="form-control" id="appID"
                            onChange={handleAppID} />
                    </div>
                    <div>
                        <label htmlFor="approvalSelect" className="form-label">Approval</label>
                        <select name="SupApprove" id="SupAppInput" defaultValue='Pending' onChange={handleBenCoAppChange}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="specialApprovalSelect" className="form-label">Presentation Approval</label>
                        <select name="specialApprove" id="benCoAppInput" defaultValue='Pending' onChange={handleSpecialChange}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SEComment" className="form-label">Comment for Employee:</label>
                        <input type="text" className="form-control" id="SupToEmp"
                            onChange={handleBCToEmChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SBComment" className="form-label">Comment for BenCo:</label>
                        <input type="text" className="form-control" id="SToBC"
                            onChange={handleBCToSChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SHComment" className="form-label">Comment for Dept. Head:</label>
                        <input type="text" className="form-control" id="SToHead"
                            onChange={handleBCToHChange} />
                    </div>
                    <input type="submit" className="btn btn-primary" value='Submit' />
                </form>
            </div>
        </div>)
    }
    else if (props.currentUser?.userClass === 'Head') {
        return (<div id="whole">
            <br></br>
            <br></br>
            <br></br>
            <table>
                <tbody>
                    {appDisplayHead}
                </tbody>
            </table>
            <div>
                <form onSubmit={handleUpdateHead}>
                    <div className="mb-3">
                        <label htmlFor="selectedAppt" className="form-label">ID of Application to Update</label>
                        <input type="text" className="form-control" id="appID"
                            onChange={handleAppID} />
                    </div>
                    <div>
                        <label htmlFor="approvalSelect" className="form-label">Approval</label>
                        <select name="HeadApprove" id="HeadAppInput" defaultValue='Pending' onChange={handleBenCoAppChange}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="doubleApprovalSelect" className="form-label">Supervisor Approval</label>
                        <select name="doubleApprove" id="HAppInput" defaultValue='Pending' onChange={handleDoubleChange}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SEComment" className="form-label">Comment for Employee:</label>
                        <input type="text" className="form-control" id="SupToEmp"
                            onChange={handleBCToEmChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SBComment" className="form-label">Comment for BenCo:</label>
                        <input type="text" className="form-control" id="SToBC"
                            onChange={handleBCToSChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SHComment" className="form-label">Comment for Direct Supervisor:</label>
                        <input type="text" className="form-control" id="SToHead"
                            onChange={handleBCToHChange} />
                    </div>
                    <input type="submit" className="btn btn-primary" value='Submit' />
                </form>
            </div>
        </div>)
    }
    else {
        return (<div id="whole">
            <br></br>
            <br></br>
            <br></br>
            <table>
                <tbody>
                    {appDisplayEmp}
                </tbody>
            </table>
            <div>
                <form onSubmit={handleUpdateEmp}>
                    <div className="mb-3">
                        <label htmlFor="selectedAppt" className="form-label">ID of Application to Update</label>
                        <input type="text" className="form-control" id="appID"
                            onChange={handleAppID} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="AGComment" className="form-label">Grade Achieved</label>
                        <input type="text" className="form-control" id="GA"
                            onChange={handleAGChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gradeFiles" className="form-label">Grade File Upload</label>
                        <input type="file" className="form-control" id="GFileInput"
                            onChange={handleGFileChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ESComment" className="form-label">Comment for Supervisor:</label>
                        <input type="text" className="form-control" id="EmpToSup"
                            onChange={handleBCToEmChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="EBComment" className="form-label">Comment for BenCo:</label>
                        <input type="text" className="form-control" id="EToBC"
                            onChange={handleBCToSChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="EDComment" className="form-label">Comment for Dept. Head:</label>
                        <input type="text" className="form-control" id="EToHead"
                            onChange={handleBCToHChange} />
                    </div>
                    <input type="submit" className="btn btn-primary" value='Submit' />
                </form>
                <form onSubmit={handleDelete}>
                    <br></br>
                    <div className="mb-3">
                        <label htmlFor="selectedAppt" className="form-label">ID of Application to Delete</label>
                        <input type="text" className="form-control" id="appID"
                            onChange={handleAppID2} />
                    </div>
                    <input type="submit" className="btn btn-primary" value='Submit' />
                </form>
            </div>
        </div>)
    }
}

export default ViewApplicationsPage;