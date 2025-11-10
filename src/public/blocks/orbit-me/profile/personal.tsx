// components/tabs/PersonalInfoTab.tsx
import { format } from "date-fns";
import { PersonalInfo,WorkInfo } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Camera, GraduationCap, Heart, IdCard, Phone, User } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";

interface Props {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  workInfo: WorkInfo[];
  // banks: Bank[];
  // tax: Tax | null;
  handleUpload: (file: File) => Promise<boolean>;
}

export function PersonalInfoTab({
  personalInfo,
  setPersonalInfo,
  workInfo,
  // banks,
  // tax,
  handleUpload,
}: Props) {
  
  return (
    <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={personalInfo.avatar_url || "/professional-avatar.png"} alt={personalInfo.full_name} />
                    <AvatarFallback className="text-lg bg-primary text-white">
                      {personalInfo.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                    {/* Input file ẩn */}
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const success = await handleUpload(file);
                      if (success) {
                        console.log("✅ Avatar updated successfully!");
                      } else {
                        console.error("❌ Upload avatar failed");
                      }
                    }}
                  />

                  {/* Nút Camera mở input */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-white hover:bg-primary/90"
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl font-bold">{personalInfo.full_name}</h2>
                  {/* <p className="text-muted-foreground">{contractInfo.positionTitle}</p>
                  <p className="text-sm text-muted-foreground">{contractInfo.departmentName}</p> */}
                  <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                    <Badge className="bg-primary text-white hover:bg-primary">{personalInfo.id}</Badge>
                    {/* <Badge
                      variant="outline"
                      className={
                        workInfo.status === "Đang hoạt động"
                          ? "border-green-500 text-green-700"
                          : "border-gray-500 text-gray-700"
                      }
                    >
                      {workInfo.status}
                    </Badge> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Personal Information */}
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label className="text-muted-foreground">Họ và tên</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.full_name}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Ngày sinh</Label>
                  <span className="text-[16px]">
                    {personalInfo.dob
                      ? new Date(personalInfo.dob).toLocaleDateString("en-CA") // 👉 yyyy-MM-dd
                      : "—"}
                  </span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Giới tính</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.gender}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Dân tộc</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.ethnicity}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Quốc tịch</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.nationality}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground mb-2">Tình trạng hôn nhân</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.marital_status}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CCCD Information */}
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <IdCard className="h-5 w-5 text-primary" />
                Căn cước công dân
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-muted-foreground">Số CCCD</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.cccd_id}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Ngày cấp</Label>
                  <span className="text-[16px]">
                    {personalInfo.cccd_issued_date
                      ? new Date(personalInfo.cccd_issued_date).toLocaleDateString("en-CA") // 👉 yyyy-MM-dd
                      : "—"}
                  </span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Nơi cấp</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.cccd_issued_place}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Thông tin liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Email cá nhân</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.personal_email}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email công ty</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.personal_email}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Số điện thoại</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.phone}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Quê quán</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.hometown}</span>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-muted-foreground">Địa chỉ thường trú</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.permanent_address}</span>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-muted-foreground">Địa chỉ tạm trú</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.temporary_address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Liên hệ khẩn cấp
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Họ tên</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.emergency_contact_name}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Mối quan hệ</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.emergency_contact_relationship}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Số điện thoại</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.emergency_contact_phone}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Địa chỉ</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.emergency_contact_address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Trình độ học vấn
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-muted-foreground">Trình độ</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.education_level}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Xếp loại</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.education_grade}</span>
                </div>
                <div>
                  <Label className="text-muted-foreground">Bằng cấp</Label>
                  <span className="text-muted-foreground text-[16px]">{personalInfo.education_certificate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

    </div>
  );
}
