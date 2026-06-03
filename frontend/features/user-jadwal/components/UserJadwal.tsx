"use client";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

import { useJadwalUser } from "../hooks/useUserJadwal";

const WAKTU_LIST = [
  "07.00", "07.50", "08.40", "08.45", "09.35",
  "10.25", "10.30", "11.20", "12.10", "13.00",
  "13.50", "14.40", "14.45", "15.35", "16.25",
  "16.30", "17.20", "18.00", "18.50", "19.40",
  "19.45", "20.35", "21.25",
];

const RUANGAN_LIST = [
  "M09", "M10", "M11", "M12",
  "M38", "M39", "M40", "M41",
];

type InputFieldProps = {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  type?: string;
  readOnly?: boolean;
  error?: string;
  placeholder?: string;
};

function InputField({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
  error,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-semibold text-[#30418F]">
        {label}
      </Label>

      <Input
        type={type}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          h-12 rounded-2xl border-2 bg-white
          text-sm font-medium
          transition-all duration-200
          focus-visible:ring-0
          focus-visible:border-[#30418F]
          ${readOnly ? "bg-gray-50 text-gray-500" : ""}
          ${error ? "border-red-400" : "border-[#E4E7EC]"}
        `}
      />

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

type CellButtonProps = {
  ruangan: string;
  waktu: string;
  getCellJadwal: (ruangan: string, waktu: string) => {
    jadwal: {
      kelas: string;
      waktu_mulai: string;
      waktu_berakhir: string;
    };
    tipe: "TERJADWAL" | "TIDAK_TERJADWAL";
    isStart: boolean;
  } | null;
  onOpen: (ruangan: string, waktu: string) => void;
};

function CellButton({
  ruangan,
  waktu,
  getCellJadwal,
  onOpen,
}: CellButtonProps) {
  const cell = getCellJadwal(ruangan, waktu);

  const isTerjadwal = cell?.tipe === "TERJADWAL";
  const isTidakTerjadwal = cell?.tipe === "TIDAK_TERJADWAL";

  let bgClass =
    "bg-[#EEF1F5] hover:bg-[#DFE4EA] text-transparent";

  if (isTerjadwal) {
    bgClass =
      "bg-gradient-to-r from-[#30418F] to-[#4458B8] text-white hover:opacity-90 shadow-md";
  }

  if (isTidakTerjadwal) {
    bgClass =
      "bg-gradient-to-r from-[#F4721E] to-[#FF9B54] text-white hover:opacity-90 shadow-md";
  }

  const handleClick = () => {
    if (cell) {
      onOpen(ruangan, cell.jadwal.waktu_mulai);
    } else {
      onOpen(ruangan, waktu);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        h-[46px]
        rounded-xl
        font-bold
        text-[14px]
        transition-all duration-200
        hover:scale-[1.03]
        active:scale-95
        ${bgClass}
      `}
    >
      {cell ? cell.jadwal.kelas : "•"}
    </button>
  );
}

export default function UserJadwal() {
  const {
    tabsHari,
    selectedHari,
    setSelectedHari,

    loadingJadwal,
    getCellJadwal,

    modalOpen,
    form,
    formErrors,
    loadingSubmit,
    handleOpenForm,
    handleCloseModal,
    handleFormChange,
    handleSubmit,
  } = useJadwalUser();

  return (
    <div className="w-full pb-10">

      {/* HEADER */}
      <div className="mb-7">
        <h1 className="text-[40px] leading-none font-extrabold text-[#30418F]">
          Jadwal
        </h1>

        <p className="text-[#667085] mt-3 text-sm sm:text-base">
          Lihat jadwal ruangan dan lakukan peminjaman secara langsung.
        </p>
      </div>

      {/* TAB HARI */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
        {tabsHari.map((hari) => (
          <button
            key={hari}
            onClick={() => setSelectedHari(hari)}
            className={`
              min-w-[95px]
              h-[42px]
              rounded-2xl
              text-sm
              font-bold
              transition-all duration-200
              ${
                selectedHari === hari
                  ? "bg-[#30418F] text-white shadow-lg shadow-[#30418F]/30"
                  : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F5F7FF]"
              }
            `}
          >
            {hari}
          </button>
        ))}
      </div>

      {/* CARD TABLE */}
      <Card
      className="rounded-[36px] border border-[#DCDCDC] bg-white shadow-sm overflow-hidden p-0">
      {/* TOP HEADER */}
      <div className="bg-gradient-to-r from-[#30418F] to-[#4458B8] px-8 py-7">
        <div className="flex items-center gap-4 text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <CalendarDays size={22} />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Jadwal Ruangan
              </h2>

              <p className="text-sm text-white/80">
                Klik kotak pada jadwal yang kosong untuk melakukan peminjaman ruangan
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="p-5 overflow-x-auto bg-[#FAFBFC]">
          <div className="min-w-[980px]">

            {/* HEADER */}
            <div
              className="grid gap-3 mb-4"
              style={{
                gridTemplateColumns: `140px repeat(${RUANGAN_LIST.length}, minmax(0, 1fr))`,
              }}
            >
              <div className="h-[46px] rounded-2xl bg-[#EEF2FF] flex items-center justify-center font-bold text-[#30418F]">
                Waktu
              </div>

              {RUANGAN_LIST.map((ruangan) => (
                <div
                  key={ruangan}
                  className="
                    h-[46px]
                    rounded-2xl
                    bg-[#F3F4F6]
                    flex items-center justify-center
                    font-bold text-[#374151]
                  "
                >
                  {ruangan}
                </div>
              ))}
            </div>

            {/* BODY */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">

              {loadingJadwal ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid gap-3 animate-pulse"
                    style={{
                      gridTemplateColumns: `140px repeat(${RUANGAN_LIST.length}, minmax(0, 1fr))`,
                    }}
                  >
                    <div className="h-[46px] rounded-2xl bg-[#E5E7EB]" />

                    {RUANGAN_LIST.map((r) => (
                      <div
                        key={r}
                        className="h-[46px] rounded-2xl bg-[#F1F5F9]"
                      />
                    ))}
                  </div>
                ))
              ) : (
                WAKTU_LIST.map((waktu, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid gap-3"
                    style={{
                      gridTemplateColumns: `140px repeat(${RUANGAN_LIST.length}, minmax(0, 1fr))`,
                    }}
                  >

                    {/* WAKTU */}
                    <div className="
                      h-[46px]
                      rounded-2xl
                      bg-white
                      border border-[#EAECF0]
                      flex items-center justify-center
                      gap-2
                      font-bold text-[#4B5563]
                      shadow-sm
                    ">
                      <Clock3 size={15} />
                      {waktu}
                    </div>

                    {/* CELL */}
                    {RUANGAN_LIST.map((ruangan) => (
                      <CellButton
                        key={ruangan}
                        ruangan={ruangan}
                        waktu={waktu}
                        getCellJadwal={getCellJadwal}
                        onOpen={handleOpenForm}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-4 mt-7">

        <div className="flex items-center gap-3 bg-white border border-[#EAECF0] rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-5 h-5 rounded bg-[#30418F]" />
          <span className="font-semibold text-sm text-[#374151]">
            Terjadwal
          </span>
        </div>

        <div className="flex items-center gap-3 bg-white border border-[#EAECF0] rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-5 h-5 rounded bg-[#F4721E]" />
          <span className="font-semibold text-sm text-[#374151]">
            Tidak Terjadwal
          </span>
        </div>

        <div className="flex items-center gap-3 bg-white border border-[#EAECF0] rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-5 h-5 rounded bg-[#D9D9D9]" />
          <span className="font-semibold text-sm text-[#374151]">
            Kosong
          </span>
        </div>

      </div>

      {/* MODAL */}
      <Dialog
        open={modalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent className="sm:max-w-[760px] rounded-[30px] border-none p-0 overflow-hidden" aria-describedby={undefined}>

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#30418F] to-[#4458B8] px-8 py-7 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <Sparkles size={26} />
              </div>

              <div>
                <DialogTitle className="text-3xl font-extrabold">
                  Peminjaman
                </DialogTitle>

                <p className="text-white/80 text-sm mt-1">
                  Lengkapi data peminjaman ruangan
                </p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-8">

            {/* STATUS */}
            <div className="flex items-center gap-3 mb-7 flex-wrap">
              <span
                className={`
                  px-4 py-2 rounded-full text-xs font-bold tracking-wide
                  ${
                    form.jenis_peminjaman === "TERJADWAL"
                      ? "bg-[#30418F]/10 text-[#30418F]"
                      : "bg-[#F4721E]/10 text-[#F4721E]"
                  }
                `}
              >
                {form.jenis_peminjaman === "TERJADWAL"
                  ? "TERJADWAL"
                  : "TIDAK TERJADWAL"}
              </span>

              {form.kelas_jadwal && (
                <span className="text-sm text-gray-500 font-medium">
                  Kelas:{" "}
                  <span className="font-bold text-[#30418F]">
                    {form.kelas_jadwal}
                  </span>
                </span>
              )}
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <InputField
                label="Nama"
                value={form.nama}
                onChange={(val) => handleFormChange("nama", val)}
                error={formErrors.nama}
                placeholder="Masukkan nama lengkap"
              />

              <InputField
                label="Kelas"
                value={form.kelas}
                onChange={(val) => handleFormChange("kelas", val)}
                error={formErrors.kelas}
                readOnly={form.jenis_peminjaman === "TERJADWAL"}
              />

              <InputField
                label="Tanggal"
                type="date"
                value={form.tanggal}
                onChange={(val) =>
                  handleFormChange("tanggal", val.replaceAll("/", "-"))
                }
                error={formErrors.tanggal}
              />

              <InputField
                label="Ruangan"
                value={form.ruangan}
                readOnly
                error={formErrors.ruangan}
              />

              <InputField
                label="Waktu Mulai"
                value={form.waktu_mulai}
                readOnly
                error={formErrors.waktu_mulai}
              />

              <InputField
                label="Waktu Berakhir"
                value={form.waktu_berakhir}
                onChange={
                  form.jenis_peminjaman === "TIDAK_TERJADWAL"
                    ? (val) =>
                        handleFormChange("waktu_berakhir", val)
                    : undefined
                }
                readOnly={
                  form.jenis_peminjaman !== "TIDAK_TERJADWAL"
                }
                error={formErrors.waktu_berakhir}
                placeholder="Contoh: 10.25"
              />

              <InputField
                label="Kode Proyektor"
                value={form.kode_proyektor}
                readOnly
                error={formErrors.kode_proyektor}
              />

              <InputField
                label="Keterangan"
                value={form.keterangan}
                onChange={(val) =>
                  handleFormChange("keterangan", val)
                }
                error={formErrors.keterangan}
                placeholder="Keperluan peminjaman"
              />

            </div>

            {/* BUTTON */}
            <div className="flex gap-4 mt-8">

              <Button
                type="button"
                onClick={handleCloseModal}
                disabled={loadingSubmit}
                className="
                  flex-1 h-14 rounded-2xl
                  bg-[#F4721E] hover:bg-[#E46312]
                  text-white font-bold text-base
                  shadow-lg
                "
              >
                Batal
              </Button>

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loadingSubmit}
                className="
                  flex-1 h-14 rounded-2xl
                  bg-[#30418F] hover:bg-[#23306d]
                  text-white font-bold text-base
                  shadow-lg
                "
              >
                {loadingSubmit ? "Menyimpan..." : "Simpan"}
              </Button>

            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}