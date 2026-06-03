"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useJadwal } from "../hook/useJadwal";

export default function JadwalForm() {
  const { createJadwal, loading, errors } = useJadwal();

  const [form, setForm] = useState({
    kelas: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_berakhir: "",
    ruangan: "",
    jenis: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJadwal(form);
  };

  return (
    <div>
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-[#30418F] mb-8">
        Jadwal
      </h1>

      {/* CARD */}
      <Card className="w-full rounded-2xl border border-gray-200 shadow-sm">
        <CardContent className="p-6 sm:p-10 lg:p-14">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-x-12 lg:gap-x-24 lg:gap-y-10"
          >
            {/* Kelas */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#30418F]">
                Kelas
              </Label>

              <Input
                value={form.kelas}
                onChange={(e) =>
                  setForm({
                    ...form,
                    kelas: e.target.value,
                  })
                }
                className="h-12 sm:h-14 border-[3px] rounded-xl sm:rounded-2xl focus-visible:ring-0"
                style={{ borderColor: "#F4B539" }}
              />

              {errors.kelas && (
                <p className="text-xs text-red-500">
                  {errors.kelas}
                </p>
              )}
            </div>

            {/* Tanggal */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#30418F]">
                Tanggal
              </Label>

              <Input
                type="date"
                value={form.tanggal}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tanggal: e.target.value.replaceAll(
                      "/",
                      "-"
                    ),
                  })
                }
                className="h-12 sm:h-14 border-[3px] rounded-xl sm:rounded-2xl focus-visible:ring-0"
                style={{ borderColor: "#F4B539" }}
              />

              {errors.tanggal && (
                <p className="text-xs text-red-500">
                  {errors.tanggal}
                </p>
              )}
            </div>

            {/* Waktu Mulai */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#30418F]">
                Waktu Mulai
              </Label>

              <Input
                type="time"
                value={form.waktu_mulai}
                onChange={(e) =>
                  setForm({
                    ...form,
                    waktu_mulai: e.target.value,
                  })
                }
                className="h-12 sm:h-14 border-[3px] rounded-xl sm:rounded-2xl focus-visible:ring-0"
                style={{ borderColor: "#F4B539" }}
              />

              {errors.waktu_mulai && (
                <p className="text-xs text-red-500">
                  {errors.waktu_mulai}
                </p>
              )}
            </div>

            {/* Waktu Berakhir */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#30418F]">
                Waktu Berakhir
              </Label>

              <Input
                type="time"
                value={form.waktu_berakhir}
                onChange={(e) =>
                  setForm({
                    ...form,
                    waktu_berakhir: e.target.value,
                  })
                }
                className="h-12 sm:h-14 border-[3px] rounded-xl sm:rounded-2xl focus-visible:ring-0"
                style={{ borderColor: "#F4B539" }}
              />

              {errors.waktu_berakhir && (
                <p className="text-xs text-red-500">
                  {errors.waktu_berakhir}
                </p>
              )}
            </div>

            {/* Ruangan */}
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#30418F]">
                Ruangan
              </Label>

              <Input
                value={form.ruangan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ruangan: e.target.value,
                  })
                }
                className="w-full h-12 sm:h-14 border-[3px] rounded-xl sm:rounded-2xl focus-visible:ring-0"
                style={{ borderColor: "#F4B539" }}
              />

              {errors.ruangan && (
                <p className="text-xs text-red-500">
                  {errors.ruangan}
                </p>
              )}
            </div>

            {/* Jenis Jadwal */}
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#30418F]">
                Jenis Jadwal
              </Label>

              <Select
                value={form.jenis}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    jenis: value,
                  })
                }
              >
                <SelectTrigger
                  className="w-full h-12 sm:h-14 min-h-[48px] sm:min-h-[56px] border-[3px] rounded-xl sm:rounded-2xl bg-white px-3 hover:bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-white"
                  style={{ borderColor: "#F4B539" }}
                >
                  <SelectValue placeholder="Pilih Jenis Jadwal" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="terjadwal">
                    Terjadwal
                  </SelectItem>

                  <SelectItem value="tidak terjadwal">
                    Tidak Terjadwal
                  </SelectItem>
                </SelectContent>
              </Select>

              {errors.jenis && (
                <p className="text-xs text-red-500">
                  {errors.jenis}
                </p>
              )}
            </div>
            {/* BUTTON */}
            <div className="flex flex-col sm:flex-row gap-4 md:col-span-2 sm:justify-end">
              <Button
                type="button"
                onClick={() =>
                  setForm({
                    kelas: "",
                    tanggal: "",
                    waktu_mulai: "",
                    waktu_berakhir: "",
                    ruangan: "",
                    jenis: "",
                  })
                }
                className="h-12 sm:h-14 w-full sm:w-40 lg:w-48 rounded-2xl text-base sm:text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "#F4721E",
                  color: "white",
                }}
              >
                Batal
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 sm:h-14 w-full sm:w-40 lg:w-48 rounded-2xl text-base sm:text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "#30418F",
                  color: "white",
                }}
              >
                {loading ? "Loading..." : "Simpan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}