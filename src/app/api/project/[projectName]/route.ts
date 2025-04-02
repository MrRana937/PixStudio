import { Next } from "hono"

import { NextRequest, NextResponse } from "next/server"


export const GET = (req: NextRequest, { params }: { params: { projectNama: string } }) => {
    const projectName=params.projectNama
    return NextResponse.json({ project: projectName });
};

