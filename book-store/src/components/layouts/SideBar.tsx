"use client";
import {
  Award,
  BarChart2,
  Book,
  BookIcon,
  Building2,
  Calendar,
  CalendarCheck,
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  List,
  LogOut,
  MapPin,  
  PersonStanding,  
  Settings,
  StarIcon,
  Tags,
  Trash,
  Trash2,
  User,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,  
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,  
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SideBar = () => {
//   const { data: session } = useSession();
  // console.log(session);
  return (
    <Sidebar collapsible="icon" variant="floating">            

      {/* Main Navigation */}
      <SidebarContent>

        {/* Fleet Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Fleet Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        <BookIcon className="w-4 h-4" />
                        Books
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      {/* <SidebarGroupContent /> */}
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/dashboard/vehicles" className="">
                              <List className="w-3 h-3" />
                              <span>All Book</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                        
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>

                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        <PersonStanding className="w-4 h-4" />
                          Author
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/author">
                              <List className="w-3 h-3" />
                              <span>All Author</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                        
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>

                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        <StarIcon className="w-4 h-4" />
                          Rating
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/dashboard/brands">
                              <List className="w-3 h-3" />
                              <span>All Rating</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>                        
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Booking Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Bookings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookings">
                    <CalendarCheck className="w-4 h-4" />
                    <span>All Bookings</span>
                    <Badge className="ml-auto">24</Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookings/calendar">
                    <Calendar className="w-4 h-4" />
                    <span>Booking Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookings/pending">
                    <Clock className="w-4 h-4" />
                    <span>Pending Approval</span>
                    <Badge variant="secondary" className="ml-auto">
                      5
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Customer Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Customers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/customers">
                    <Users className="w-4 h-4" />
                    <span>Customer List</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/customers/loyalty">
                    <Award className="w-4 h-4" />
                    <span>Loyalty Program</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Financial Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Financial</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/payments">
                    <CreditCard className="w-4 h-4" />
                    <span>Payments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/invoices">
                    <FileText className="w-4 h-4" />
                    <span>Invoices</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/reports">
                    <BarChart2 className="w-4 h-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings/company">
                    <Building2 className="w-4 h-4" />
                    <span>Company Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings/rates">
                    <DollarSign className="w-4 h-4" />
                    <span>Rates & Pricing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings/users">
                    <UserCog className="w-4 h-4" />
                    <span>User Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  );
};

export default SideBar;
