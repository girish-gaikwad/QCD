"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Bell,
    ChevronDown,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
    return (
        <header className=" z-[999] border-b border border-border/40 bg-[#1a1a1a] text-white h-16 px-6 flex items-center justify-between">
            {/* Company Name */}
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-white">Quick Commerce Inc</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl border-none bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 hover:border-gray-300">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search anything..."
                        className="pl-8 border-none hover:border focus-visible:ring-1 w-full pr-10"
                    />
                    <div className="absolute right-2 top-1.5 flex items-center space-x-1 text-sm text-muted-foreground">
                        <kbd className="bg-gray-200 px-1.5 py-0.5 rounded">Ctrl</kbd>
                        <kbd className="bg-gray-200 px-1.5 py-0.5 rounded">K</kbd>
                    </div>
                </div>
            </div>


            {/* Right Section - Notifications & Profile */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                        3
                    </span>
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="pl-2 pr-3 gap-2">
                            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                                <span className="text-sm font-medium">JD</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">John Doe</span>
                                <span className="text-xs text-muted-foreground">Admin</span>
                            </div>
                            <ChevronDown size={16} className="text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;