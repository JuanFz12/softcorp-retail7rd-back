import { prisma } from "../../../../../../config";
import { CustomError } from "../../../../shared";
import { ChampionShip, ChampionShipAttributes, Sport, SportAttributes, Tournament, TournamentAttributes } from "../../domain";

export interface SportServiceInterface {
    //*Find
    findSports(): Promise<SportAttributes[]>;
    findChampionShips(): Promise<ChampionShipAttributes[]>;
    findTournament(): Promise<TournamentAttributes[]>;
    //*Find One
    findOneSport(id: number): Promise<SportAttributes>;
    findOneChampionShip(id: number): Promise<ChampionShipAttributes>;
    findOneTournament(id: number): Promise<TournamentAttributes>;
    //* Find multiple by IDs
    findSportsByIds(ids: number[]): Promise<SportAttributes[]>;
    findChampionShipsByIds(ids: number[]): Promise<ChampionShipAttributes[]>;
    findTournamentsByIds(ids: number[]): Promise<TournamentAttributes[]>;

    //*All
    findAllSportInformation(): Promise<{ sports: SportAttributes[]; championships: ChampionShipAttributes[]; tournaments: TournamentAttributes[] }>;
}
export class SportService implements SportServiceInterface {
    async findAllSportInformation(): Promise<{ sports: SportAttributes[]; championships: ChampionShipAttributes[]; tournaments: TournamentAttributes[]; }> {
        try {
            const sports = await this.findSports();
            const tournaments = await this.findTournament();
            const championships = await this.findChampionShips();
            return { sports, tournaments, championships };
        } catch (error) {
            throw error;
        }
    }
    async findSports(): Promise<SportAttributes[]> {
        try {
            const sports = await prisma.sport.findMany();
            return sports.map(({ id, name }) => Sport.fromObject({ id, name }).sportAttributes)
        } catch (error) {
            throw error;
        }
    }
    async findOneSport(id: number): Promise<SportAttributes> {
        try {
            const sport = await prisma.sport.findUnique({ where: { id } });
            if (!sport) throw - CustomError.notFound('Sport not found');
            return Sport.fromObject({ ...sport }).sportAttributes;
        } catch (error) {
            throw error;
        }
    }
    async findSportsByIds(ids: number[]): Promise<SportAttributes[]> {
        try {
            const sports = await prisma.sport.findMany({ where: { id: { in: ids } } });
            const foundIds = sports.map(sport => sport.id);
            const missingIds = ids.filter(id => !foundIds.includes(id));
            if (missingIds.length > 0) {
                throw CustomError.notFound(`Sport(s) with ID(s) ${missingIds.join(', ')} not found`);
            }
            return sports.map(({ id, name }) => Sport.fromObject({ id, name }).sportAttributes);
        } catch (error) {
            throw error;
        }
    }
    async findChampionShips(): Promise<ChampionShipAttributes[]> {
        try {
            const championships = await prisma.championship.findMany();
            return championships.map(({ id, name }) => ChampionShip.fromObject({ id, name }).championShipAttributes)
        } catch (error) {
            throw error;
        }
    }
    async findOneChampionShip(id: number): Promise<ChampionShipAttributes> {
        try {
            const championShip = await prisma.championship.findUnique({ where: { id } });
            if (!championShip) throw CustomError.notFound('Championship not found');
            return ChampionShip.fromObject({ ...championShip }).championShipAttributes;
        } catch (error) {
            throw error;
        }
    }
    async findChampionShipsByIds(ids: number[]): Promise<ChampionShipAttributes[]> {
        try {
            const championships = await prisma.championship.findMany({ where: { id: { in: ids } } });
            const foundIds = championships.map(championship => championship.id);
            const missingIds = ids.filter(id => !foundIds.includes(id));
            if (missingIds.length > 0) {
                throw CustomError.notFound(`Championship(s) with ID(s) ${missingIds.join(', ')} not found`);
            }
            return championships.map(({ id, name }) => ChampionShip.fromObject({ id, name }).championShipAttributes);
        } catch (error) {
            throw error;
        }
    }

    async findTournament(): Promise<TournamentAttributes[]> {
        try {
            const tournaments = await prisma.tournament.findMany();
            return tournaments.map(({ id, name }) => Tournament.fromObject({ id, name }).tournamentAttributes);
        } catch (error) {
            throw error;
        }
    }
    async findOneTournament(id: number): Promise<TournamentAttributes> {
        try {
            const tournament = await prisma.tournament.findUnique({ where: { id } });
            if (!tournament) throw CustomError.notFound('tournament not found');
            return tournament;
        } catch (error) {
            throw error;
        }
    }
    async findTournamentsByIds(ids: number[]): Promise<TournamentAttributes[]> {
        try {
            const tournaments = await prisma.tournament.findMany({ where: { id: { in: ids } } });
            const foundIds = tournaments.map(tournament => tournament.id);
            const missingIds = ids.filter(id => !foundIds.includes(id));
            if (missingIds.length > 0) {
                throw CustomError.notFound(`Tournament(s) with ID(s) ${missingIds.join(', ')} not found`);
            }
            return tournaments.map(({ id, name }) => Tournament.fromObject({ id, name }).tournamentAttributes);
        } catch (error) {
            throw error;
        }
    }
}