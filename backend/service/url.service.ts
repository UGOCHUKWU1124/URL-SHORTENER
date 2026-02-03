import { Url } from "@prisma/client";
import prisma from "../../packages/prisma";
import { ValidationError } from '../../packages/error-handler';


export interface ShortenUrlPayload {
    originalUrl: string;
}

export interface UpdateUrlPayload {
    originalUrl: string;
}

class UrlService {
    private generateShortCode(): string {
        return Math.random().toString(36).substring(2, 8);
    }

    private async generateUniqueShortCode(): Promise<string> {
        while (true) {
            const shortCode = this.generateShortCode();

            const exists = await prisma.url.findUnique({
                where: { shortCode },
            });

            if (!exists) {
                return shortCode;
            }
        }
    }

    async getOriginalUrl(shortCode: string): Promise<string> {
        const url = await prisma.url.findUnique({
            where: { shortCode },
        });

        if (!url) {
            throw new ValidationError("URL not found");
        }

        await prisma.url.update({
            where: { id: url.id },
            data: { accessCount: { increment: 1 } },
        });

        return url.originalUrl;
    }

    async getUrlStats(shortCode: string): Promise<Url> {
        const url = await prisma.url.findUnique({
            where: { shortCode },
        });

        if (!url) {
            throw new ValidationError("URL not found");
        }

        return url;
    }

    async shortenUrl(payload: ShortenUrlPayload): Promise<Url> {
        const { originalUrl } = payload;

        if (!originalUrl) {
            throw new ValidationError("Original URL is required");
        }

        const shortCode = await this.generateUniqueShortCode();

        return prisma.url.create({
            data: {
                originalUrl,
                shortCode,
            },
        });
    }

    async updateUrl(shortCode: string, payload: UpdateUrlPayload): Promise<Url> {
        const { originalUrl } = payload;

        const url = await prisma.url.findUnique({ where: { shortCode } });

        if (!url) {
            throw new ValidationError("URL not found");
        }

        const updatedUrl = await prisma.url.update({
            where: { id: url.id },
            data: { originalUrl },
        });

        return updatedUrl;
    }

    async deleteUrl(shortCode: string): Promise<void> {
        const url = await prisma.url.findUnique({ where: { shortCode } });

        if (!url) {
            throw new ValidationError("URL not found");
        }

        await prisma.url.delete({
            where: { id: url.id },
        });
    }
}

export default new UrlService();