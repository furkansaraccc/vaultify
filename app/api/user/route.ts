import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { hash, compare } from 'bcryptjs';
import prisma from '@/lib/prisma'; // Ensure this path matches your project structure

// Define the type for updateData
interface UpdateData {
  name?: string;
  email?: string;
  password?: string;
}

// Get user profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        passwordHistory: {
          select: {
            id: true,
            title: true,
            lastAccessed: true,
            updatedAt: true,
          },
          orderBy: {
            lastAccessed: 'desc',
          },
          take: 10,
        },
      },
    });

    return NextResponse.json(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) { // Add type annotation
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

// Update user profile
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    const updateData: UpdateData = {}; // Use the defined interface
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (newPassword) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const isValidPassword = await compare(currentPassword, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      updateData.password = await hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) { // Add type annotation
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}

// Delete user account
export async function DELETE() {
  try {
    // FIXED: Changed "aOptions" to "authOptions" 
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}